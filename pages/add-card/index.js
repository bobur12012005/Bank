import axios from "axios"
import { isError } from "../../modules/status.js"

let baseURL = import.meta.env.VITE_BASE_URL
let form = document.forms.namedItem('card-adding')
let loc = JSON.parse(localStorage.getItem('user'))

form.onsubmit = (event) => {
    event.preventDefault()

    let fm = new FormData(event.target)

    let card = {
        id: String(Math.random()),
        userId: loc.id,
        name: fm.get('name'),
        currency: fm.get('currency')
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
                location.assign('/pages/cards/')
            }
        })
}