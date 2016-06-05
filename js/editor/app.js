
import Editor from './editor'
import CaretPos from './CaretPos'

import PatchEvent from './patch_event'

let editor_element = document.querySelector("#editor")
let caret_pos = CaretPos(editor_element)
let editor = Editor(editor_element, caret_pos)

window.editor = editor

PatchEvent(editor_element, caret_pos, editor)