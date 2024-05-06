import axios from "axios"

let baseURL = import.meta.env.VITE_BASE_URL
let form = document.forms.namedItem('transaction-adding')
let user = JSON.parse(localStorage.getItem('user'))

form.onsubmit = (event) => {
    event.preventDefault()

    let fm = new FormData(event.target)

    let transaction = {
        id: String(Math.floor(Math.random() * 100000000000)),
        userId: user.id,
        cardId: "",
        fromCard: fm.get('fromCard'),
        amount: fm.get('amount'),
        category: fm.get('category'),
        time: new Date().toLocaleDateString()
    }

    let { fromCard, amount, category } = transaction

    if (fromCard === "" || amount === "" || category === "") {
        alert('Error! Fill all the fields!')
        return
    }

    axios.post(baseURL + '/transactions', transaction)
        .then(res => {
            if (res.status == 200 || res.status === 201) {
                location.assign('/pages/transactions/')
            }
        })
}