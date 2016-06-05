import {Base} from '../Base'

class CaretPos {
    constructor(editor_element) {
        Base.Assert(editor_element, "should be nul")

        this._editor_element = editor_element
        this.rp = undefined
    }

    getNodeIndex(n) {
        var i = 0;
        while (n = n.previousSibling) i++;
        return i
    }

    SaveCaretPos() {
        if(!window.getSelection().getRangeAt) {
            return;
        }

        var range = window.getSelection().getRangeAt(0);
        var sC = range.startContainer, eC = range.endContainer;

        let A = [];
        while (sC !== this._editor_element) {
            A.push(this.getNodeIndex(sC));
            sC = sC.parentNode
        }

        let B = [];
        while (eC !== this._editor_element) {
            B.push(this.getNodeIndex(eC));
            eC = eC.parentNode
        }

        this.rp = { "sC": A, "sO": range.startOffset, "eC": B, "eO": range.endOffset };
    }

    RestoreCaretPos() {
        this._editor_element.focus();
        
        if(!window.getSelection().getRangeAt) {
            return;
        }
        
        var sel = window.getSelection(), range = sel.getRangeAt(0);
        var x, C, sC = this._editor_element, eC = this._editor_element;

        C = this.rp.sC;
        x = C.length;
        while (x--) {
            sC = sC.childNodes[C[x]];
        }

        C = this.rp.eC;
        x = C.length;
        while (x--) {
            eC = eC.childNodes[C[x]];
        }

        range.setStart(sC, this.rp.sO);
        range.setEnd(eC, this.rp.eO);
        sel.removeAllRanges();
        sel.addRange(range)
    }
}

module.exports = editor_element => new CaretPos(editor_element)