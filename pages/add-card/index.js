import axios from "axios"
import { isError } from "../../modules/status.js"

let baseURL = import.meta.env.VITE_BASE_URL
let form = document.forms.namedItem('card-adding')
let loc = JSON.parse(localStorage.getItem('user'))

let select = document.querySelector('#select')

axios.get('https://api.apilayer.com/fixer/symbols', {
    headers: {
        apikey: import.meta.env.VITE_API_KEY
    }
}) 
.then (res => {
    let symbols = res.data.symbols
    for (let key in symbols) {
        let opt = new Option(`${key} (${symbols[key]})`, key)

        select.append(opt)
    }
})

form.onsubmit = (event) => {
    event.preventDefault()

    let fm = new FormData(event.target)

    let card = {
        id: String(Math.random()),
        userId: loc.id,
        name: fm.get('name'),
        currency: fm.get('currency'),
        balance: fm.get('balance')
    }

    let { name, currency } = card

    if (name === "" || currency === 'currency') {
        isError('error', 'Fill both of the fields!')
        return
    }

    axios.post(baseURL + '/cards', card)
        .then(res => {
            if (res.status == 200 || res.status === 201) {
                isError('success', '')
                setTimeout(() => {
                    location.assign('/pages/cards/')
                }, 3300)
            }
        })
}