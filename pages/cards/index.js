import axios from "axios"
import { createHeader, reloadCards } from "../../modules/ui.js"
let baseURL = import.meta.env.VITE_BASE_URL

let header = document.querySelector('header .inner-header')
let container = document.querySelector('.card-container')

createHeader(header)

axios.get(baseURL + '/cards')
.then(res => reloadCards(res.data, container))

let userEmail = document.querySelector('#user-email')
let loc = JSON.parse(localStorage.getItem('user'))
userEmail.innerHTML = loc.email

let addCardBtn = document.querySelector('#add-card')
addCardBtn.onclick = () => {
    location.assign('/pages/add-card/')
}