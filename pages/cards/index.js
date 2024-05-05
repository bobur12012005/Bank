import { createHeader, reloadCards } from "../../modules/ui.js"

let wallet = JSON.parse(localStorage.getItem('wallet'))
let header = document.querySelector('header .inner-header')
let container = document.querySelector('.card-container')

createHeader(header)
reloadCards(wallet, container)

let userEmail = document.querySelector('#user-email')
let loc = JSON.parse(localStorage.getItem('user'))
userEmail.innerHTML = loc.email

let addCardBtn = document.querySelector('#add-card')
addCardBtn.onclick = () => {
    location.assign('/pages/add-card/')
}