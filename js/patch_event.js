import Base from './base'

module.exports = (editor_element, caret_pos, editor) => {

    let save_caret_pos = () => caret_pos.SaveCaretPos()

    let window_height = window.innerHeight;
    let editor_height = editor.DomNode().offsetHeight

    let auto_grow_caret = () => {
        if (editor.DomNode().offsetHeight == editor_height) {
            return;
        }

        Base.Print([`height grow by ${editor.DomNode().offsetHeight - editor_height}`,
        `Window:${window_height} Editor:${editor.DomNode().offsetHeight} keyboard:${editor.KeyboardHeight()}`            
        ])

        if (editor.KeyboardHeight() + editor.DomNode().offsetHeight > window_height) {
            window.scrollTo(0, editor.KeyboardHeight() + editor.DomNode().offsetHeight - window_height)
        } else {
            window.scrollTo(0, 0)
        }
    }

    window.addEventListener('load', function (e) {
        editor_element.innerHTML = null
        editor_element.focus()
        editor.FormatBlock('p')
    })

    window.addEventListener('click', function () {
        setTimeout(save_caret_pos, 100)
    });

    window.addEventListener('touchend', function () {
        setTimeout(save_caret_pos, 100)
    });

    window.addEventListener('keydown', function (e) {
        editor_height = editor.DomNode().offsetHeight
    });

    window.addEventListener('keyup', function (e) {

        auto_grow_caret()

        var keyCode = e.keyCode;

        window.location.hash = `keyup-${keyCode}-${Math.random()}`

        setTimeout(save_caret_pos, 100)
    })

    window.addEventListener('focus', function (e) {
        window.location.hash = `focus-${Math.random()}`
    })

    window.addEventListener('paste', function (e) {

        setTimeout(save_caret_pos, 100)
        setTimeout(auto_grow_caret, 100)

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
}