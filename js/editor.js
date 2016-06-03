/**
 * Created by dev on 2016/6/1.
 */

import Base from './base'

class Editor {
    constructor(editor_element, caret_pos) {       
        this._editor_element = editor_element
        this._caret_pos = caret_pos
    }

    AssertNotNull(val) {
        Base.Assert(val, '数值不能为空')
    }

    _format(cmd, val) {
        return document.execCommand(cmd, false, val || '');
    }

    Reformat() {
        return this._format('removeFormat')
    }

    Bold() {
        return this._format('bold')
    }

    Italic() {
        return this._format('italic')
    }

    Underline() {
        return this._format('underline')
    }

    Strikethrough() {
        return this._format('strikethrough')
    }

    Justifyleft() {
        return this._format('justifyleft')
    }

    Justifycenter() {
        return this._format('justifycenter')
    }

    Justifyright() {
        return this._format('justifyright')
    }

    Indent() {
        return this._format('indent')
    }

    Outdent() {
        return this._format('outdent')
    }

    Forecolor(val) {
        this.AssertNotNull(val)
        return this._format('forecolor', val)
    }

    Bgcolor(val) {
        this.AssertNotNull(val)
        return this._format('hilitecolor', val)
    }

    Forecolor(val) {
        this.AssertNotNull(val)
        return this._format('forecolor', val)
    }

    InsertLink(val) {
        this.AssertNotNull(val)

        var result = this._format('createlink', val)

        if (result) {
            window.location.hash = `insert-${val}-${Math.random()}`
        }

        return result
    }

    InsertPicture(val) {
        this.AssertNotNull(val)

        var result = this._format('insertimage', val)

        if (result) {
            window.location.hash = `insert-${val}-${Math.random()}`
        }

        return result
    }

    Fontname(val) {
        this.AssertNotNull(val)
        
        return this._format('fontname', val)
    }

    Fontsize(val) {
        this.AssertNotNull(val)
        
        return this._format('fontsize', val)
    }

    InertOrderList() {
        return this._format('insertorderedlist')
    }

    InertUnorderList() {
        return this._format('insertunorderedlist')
    }

    Content() {
        return this._editor_element.innerHTML
    }

    SetContent(content) {
        this._editor_element.innerHTML = content
    }

    SaveCaretPos() {
        this._caret_pos.SaveCaretPos()
    }

    RestoreCaretPos() {
        this._caret_pos.RestoreCaretPos()
    }
}

module.exports = (val, caret_pos) => new Editor(val, caret_pos)