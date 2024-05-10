let card = document.querySelector('.card')

card.ondblclick = () => {
    card.classList.toggle('is-flipped')
}

card.onmousemove = (event) => {
    let rect = card.getBoundingClientRect()
    let x = event.clientX - rect.left
    let y = event.clientY - rect.top

    let rotateX = (y / rect.height - 0.5) * 40
    let rotateY = (x / rect.width - 0.5) * -40

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
}

card.onmouseleave = () => {
    card.style.transform = ''
}

let backBtn = document.querySelector('.back-btn')
backBtn.onclick = () => {
    location.assign('/pages/cards/')
}