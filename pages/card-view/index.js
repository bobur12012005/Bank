import axios from "axios"
import { getData } from "../../modules/http.request"

let card = document.querySelector('.card')
let select = document.querySelector('#select')
let backBtn = document.querySelector('.back-btn')

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

backBtn.onclick = () => {
    location.assign('/pages/cards/')
}

axios.get('https://api.apilayer.com/fixer/symbols', {
    headers: {
        apikey: import.meta.env.VITE_API_KEY
    }
})
    .then(res => {
        let symbols = res.data.symbols
        for (let key in symbols) {
            let opt = new Option(`${key} (${symbols[key]})`, key)
            select.append(opt)
        }
    })

let id = location.search.split('=').at(-1)
let cardName = document.querySelector('.front-class-name')
let cardNumber = document.querySelector('.cardNumber')
let cardholderName = document.querySelector('.cardholderName')

getData('/cards/' + id)
    .then(res => {
        cardName.innerHTML = res.name
        cardNumber.innerHTML = res.id

        getData('/users/' + res.userId)
            .then(user => {
                cardholderName.innerHTML = user.name
            })
    })