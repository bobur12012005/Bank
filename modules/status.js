export function isError(txt, txtAdding) {
    let message = document.createElement('div')
    message.style.cssText = `
        width: fit-content;
        padding: 10px 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
        position: absolute;
        top: 50px;
        right: -200px;
        transition: all 0.3s ease;
    `

    if (txt === 'success') {
        message.style.background = "green"
        message.innerHTML = 'Success!' + " " + txtAdding
    } else if (txt === 'error') {
        message.style.background = "red"
        message.innerHTML = 'Error!' + " " + txtAdding
    }

    document.body.appendChild(message)

    setTimeout(() => {
        message.style.right = "0px"
    }, 300)

    setTimeout(() => {
        message.style.right = "-200px"
        setTimeout(() => {
            message.remove()
        }, 300)
    }, 3000)
}