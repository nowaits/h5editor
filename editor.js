/**
 * Created by dev on 2016/6/1.
 */


var editor = {}

function assert(condition, message) {
    if (!condition) {
        throw message || "Assertion failed";
    }
}

editor._format = function (cmd, val) {
    window.focus()
    return document.execCommand(cmd, false, val || '');
}

editor.Reformat = function () {
    return this._format('removeFormat')
}

editor.Bold = function () {
    return this._format('bold')
}

editor.Italic = function () {
    return this._format('italic')
}

editor.Underline = function () {
    return this._format('underline')
}

editor.Strikethrough = function () {
    return this._format('strikethrough')
}

editor.Justifyleft = function () {
    return this._format('justifyleft')
}

editor.Justifycenter = function () {
    return this._format('justifycenter')
}

editor.Justifyright = function () {
    return this._format('justifyright')
}

editor.Indent = function () {
    return this._format('indent')
}

editor.Outdent = function () {
    return this._format('outdent')
}

editor.Forecolor = function (val) {
    assert(val, '数值不能为空')
    return this._format('forecolor', val)
}

editor.Bgcolor = function (val) {
    assert(val, '数值不能为空')
    return this._format('hilitecolor', val)
}

editor.Forecolor = function (val) {
    assert(val, '数值不能为空')
    return this._format('forecolor', val)
}

editor.InsertLink = function (val) {
    assert(val, '数值不能为空')

    var result = this._format('createlink', val)

    if (result) {
        window.location.hash = `insert-${val}-${Math.random()}`
    }

    return result
}

editor.InsertPicture = function (val) {
    assert(val, '数值不能为空')

    var result = this._format('insertimage', val)

    if (result) {
        window.location.hash = `insert-${val}-${Math.random()}`
    }

    return result
}

editor.Fontname = function (val) {
    assert(val, '数值不能为空')
    return this._format('fontname', val)
}

editor.Fontsize = function (val) {
    assert(val, '数值不能为空')
    return this._format('fontsize', val)
}

editor.InertOrderList = function () {
    return this._format('insertorderedlist')
}

editor.InertUnorderList = function () {
    return this._format('insertunorderedlist')
}

editor.Content = function () {
    return document.body.innerHTML
}

editor.SetContent = function (content) {
    document.body.innerHTML = content
}

editor.SaveCaretPos = function () {
    saveRangePosition()
}

editor.RestoreCaretPos = function () {
    restoreRangePosition()
}

window.addEventListener('load', function (e) {
    document.body.innerHTML = null
    document.body.focus()
})

window.addEventListener('click', function() { 
    setTimeout(saveRangePosition, 100)
});

window.addEventListener('touchend', function() { 
    setTimeout(saveRangePosition, 100)
});

window.addEventListener('keydown', function (e) {
});

window.addEventListener('keyup', function (e) {

    var keyCode = e.keyCode;

    window.location.hash = `keyup-${keyCode}-${Math.random()}`

    console.log(window.location.hash)

    setTimeout(saveRangePosition, 100)
})

window.addEventListener('focus', function (e) {
    window.location.hash = `focus-${Math.random()}`
})

window.addEventListener('paste', function (e) {

    setTimeout(saveRangePosition, 100)

    if (!e.clipboardData || !e.clipboardData.items || e.clipboardData.items.length <= 0) {
        window.location.hash = `paste-unknow-${Math.random()}`
        return;
    }

    var copiedData = e.clipboardData.items[0];

    window.location.hash = `paste-${copiedData.type}-${Math.random()}`

    if (copiedData.type.indexOf("image") == -1) {
        return;
    }

    var imageFile = copiedData.getAsFile();

    var blobUrl = URL.createObjectURL(imageFile);

    editor.InsertPicture(blobUrl)
});


function saveRangePosition() {
    var range = window.getSelection().getRangeAt(0);
    var sC = range.startContainer, eC = range.endContainer;

    A = []; while (sC !== document.body) { A.push(getNodeIndex(sC)); sC = sC.parentNode }
    B = []; while (eC !== document.body) { B.push(getNodeIndex(eC)); eC = eC.parentNode }

    window.rp = { "sC": A, "sO": range.startOffset, "eC": B, "eO": range.endOffset };
}

function restoreRangePosition() {
    document.body.focus()
    var sel = window.getSelection(), range = sel.getRangeAt(0);
    var x, C, sC = document.body, eC = document.body;

    C = rp.sC; x = C.length; while (x--) sC = sC.childNodes[C[x]];
    C = rp.eC; x = C.length; while (x--) eC = eC.childNodes[C[x]];

    range.setStart(sC, rp.sO);
    range.setEnd(eC, rp.eO);
    sel.removeAllRanges();
    sel.addRange(range)
}

function getNodeIndex(n) { var i = 0; while (n = n.previousSibling) i++; return i }