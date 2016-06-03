
import Editor from './editor'
import CaretPos from './CaretPos'

import PatchEvent from './patch_event'

let editor_element = document.body
let caret_pos = CaretPos(editor_element)


window.editor = Editor(editor_element, caret_pos)

PatchEvent(editor_element, caret_pos)