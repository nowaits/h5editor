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
    document.execCommand(cmd, false, val || '');
}

editor.Reformat = function () {
    this._format('removeFormat')
}

editor.Bold = function () {
    this._format('bold')
}

editor.Italic = function () {
    this._format('italic')
}

editor.Underline = function () {
    this._format('underline')
}

editor.Strikethrough = function () {
    this._format('strikethrough')
}

editor.Justifyleft = function () {
    this._format('justifyleft')
}

editor.Justifycenter = function () {
    this._format('justifycenter')
}

editor.Justifyright = function () {
    this._format('justifyright')
}

editor.Indent = function () {
    this._format('indent')
}

editor.Outdent = function () {
    this._format('outdent')
}

editor.Forecolor = function (val) {
    assert(val, '数值不能为空')
    this._format('forecolor', val)
}

editor.Bgcolor = function (val) {
    assert(val, '数值不能为空')
    this._format('hilitecolor', val)
}

editor.Forecolor = function (val) {
    assert(val, '数值不能为空')
    this._format('forecolor', val)
}

editor.InsertLink = function (val) {
    assert(val, '数值不能为空')
    this._format('createlink', val)
}

editor.InsertPicture = function (val) {
    assert(val, '数值不能为空')
    this._format('insertimage', val)
}

editor.Fontname = function (val) {
    assert(val, '数值不能为空')
    this._format('fontname', val)
}

editor.Fontsize = function (val) {
    assert(val, '数值不能为空')
    this._format('fontsize', val)
}

editor.InertOrderList = function () {

    this._format('insertorderedlist')
}

editor.InertUnorderList = function () {

    this._format('insertunorderedlist')
}

window.addEventListener('paste', function () {
    if (typeof window.getSelection === "undefined") {
        return;
    }

    var copiedData = e.clipboardData.items[0];

    if (copiedData.type.indexOf("image") == -1) {
        return;
    }

    var imageFile = copiedData.getAsFile();

    var blobUrl = URL.createObjectURL(imageFile);

    editor.InsertPicture(blobUrl)
});