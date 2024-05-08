const card = document.querySelector('.card')

card.addEventListener('mousemove', (event) => {
    const rect = card.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    const rotateX = (y / rect.height - 0.5) * 40
    const rotateY = (x / rect.width - 0.5) * -40

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
})

card.addEventListener('mouseleave', () => {
    card.style.transform = ''
})