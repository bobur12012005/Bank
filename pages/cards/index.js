import {
    createHeader,
    reloadCards
} from "../../modules/ui.js"
import { getData } from "../../modules/http.request.js"

let header = document.querySelector('header .inner-header')
let container = document.querySelector('.card-container')
let loc = JSON.parse(localStorage.getItem('user'))

createHeader(header)


getData('/cards?userId=' + loc.id)
    .then(res => {
        if (res.length === 0) {
            container.innerHTML = "+"
            container.classList.add('empty-container')
        } else {
            container.classList.remove('empty-container')
            reloadCards(res, container)
        }
    })

let userEmail = document.querySelector('#user-email')
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