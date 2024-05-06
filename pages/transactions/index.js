import axios from "axios"
import { createHeader, reloadTransactions } from "../../modules/ui.js"
let baseURL = import.meta.env.VITE_BASE_URL

let header = document.querySelector('header .inner-header')
createHeader(header)

let container = document.querySelector('.transaction-container')
axios.get(baseURL+ "/transactions")
.then(res => {
    reloadTransactions(res.data, container)
})

let userEmail = document.querySelector('#user-email')
let loc = JSON.parse(localStorage.getItem('user'))
userEmail.innerHTML = loc.email

let addTransactionBtn = document.querySelector('#add-transactions')
addTransactionBtn.onclick = () => {
    location.assign('/pages/add-transaction/')
}