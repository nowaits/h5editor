import Base from './base'

module.exports = (editor_element, caret_pos) => {

    let save_caret_pos = () => caret_pos.SaveCaretPos()

    window.addEventListener('load', function (e) {
        editor_element.innerHTML = null
        editor_element.focus()
    })

    window.addEventListener('click', function () {
        setTimeout(save_caret_pos, 100)
    });

    window.addEventListener('touchend', function () {
        setTimeout(save_caret_pos, 100)
    });

    window.addEventListener('keydown', function (e) {
    });

    window.addEventListener('keyup', function (e) {

        var keyCode = e.keyCode;

        window.location.hash = `keyup-${keyCode}-${Math.random()}`

        setTimeout(save_caret_pos, 100)
    })

    window.addEventListener('focus', function (e) {
        window.location.hash = `focus-${Math.random()}`
    })

    window.addEventListener('paste', function (e) {

        setTimeout(save_caret_pos, 100)

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