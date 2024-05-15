import axios from "axios"
import Chart from "chart.js/auto"
import { getData } from "../../modules/http.request"

let card = document.querySelector('.card')
let select = document.querySelector('#select')
let backBtn = document.querySelector('.back-btn')
let id = location.search.split('=').at(-1)
let cardName = document.querySelector('.front-class-name')
let cardNumber = document.querySelector('.cardNumber')
let cardholderName = document.querySelector('.cardholderName')
let form = document.forms.namedItem('card-data')
let answerView = document.querySelector('.card-data-bottom span')
let from = document.querySelector('#from')
let to = document.querySelector('#to')
let chartContainer = document.querySelector('.something-new')
let canvas = document.querySelector('#canvas')

form.onsubmit = (event) => {
    event.preventDefault()

    let fm = new FormData(event.target)

    let cardData = {
        from: fm.get('from'),
        to: fm.get('to'),
        amount: fm.get('amount'),
    }

    let { from, to, amount } = cardData

    if (amount <= 0) return

    axios.get(`https://api.apilayer.com/fixer/convert?to=${to}&from=${from}&amount=${amount}`, {
        headers: {
            apikey: import.meta.env.VITE_API_KEY
        }
    })
        .then(res => answerView.innerHTML = res.data.result)
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
            from.append(opt)
        }
    })

axios.get('https://api.apilayer.com/fixer/symbols', {
    headers: {
        apikey: import.meta.env.VITE_API_KEY
    }
})
    .then(res => {
        let symbols = res.data.symbols
        for (let key in symbols) {
            let opt = new Option(`${key} (${symbols[key]})`, key)
            to.append(opt)
        }
    })

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

getData('/cards/' + id)
    .then(res => {
        cardName.innerHTML = res.name
        cardNumber.innerHTML = res.id

        getData('/users/' + res.userId)
            .then(user => {
                cardholderName.innerHTML = user.name
            })
    })

getData('/transactions/')
.then(res => {
    let times = []
    let amounts = []
        for (let item of res) {
            times.push(item.time)
            amounts.push(item.amount)
        }
        const data = {
            labels: times,
            datasets: [{
                label: 'My First Dataset',
                data: amounts,
                backgroundColor: ['blue'],
                borderColor: ['lightblue'],
                borderWidth: 2
            }]
        }

        const config = {
            type: 'line',
            data: data,
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            },
        }

        new Chart(canvas, config)
    })