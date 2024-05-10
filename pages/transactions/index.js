import { createHeader, reloadTransactions } from "../../modules/ui.js"
import { getData } from "../../modules/http.request.js"

let header = document.querySelector('header .inner-header')
let container = document.querySelector('.transaction-container')
let userEmail = document.querySelector('#user-email')
let loc = JSON.parse(localStorage.getItem('user'))
let addTransactionBtn = document.querySelector('#add-transactions')

createHeader(header)

getData('/transactions?userId=' + loc.id)
    .then(res => {
        reloadTransactions(res, container)
    })

userEmail.innerHTML = loc.email

addTransactionBtn.onclick = () => {
    location.assign('/pages/add-transaction/')
}