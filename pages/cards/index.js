import axios from "axios"
import { createHeader, reloadCards } from "../../modules/ui.js"
let baseURL = import.meta.env.VITE_BASE_URL

let header = document.querySelector('header .inner-header')
let container = document.querySelector('.card-container')

createHeader(header)

axios.get(baseURL + '/cards')
    .then(res => {
        if (res.data.length === 0) {
            container.innerHTML = "+"
            container.classList.add('empty-container')
        } else {
            container.classList.remove('empty-container')
            reloadCards(res.data, container)
        }
    })

let userEmail = document.querySelector('#user-email')
let loc = JSON.parse(localStorage.getItem('user'))
userEmail.innerHTML = loc.email

let addCardBtn = document.querySelector('#add-card')
addCardBtn.onclick = () => {
    location.assign('/pages/add-card/')
}

container.onclick = () => {
    if (container.classList.contains('empty-container')) {
        location.assign('/pages/add-card/')
    }
}