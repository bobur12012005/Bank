import { createHeader, reloadCards } from "../../modules/ui.js"

let array = [1, 2, 3, 4, 5, 6]
let header = document.querySelector('header .inner-header')
let container = document.querySelector('.card-container')

createHeader(header)
reloadCards(array, container)

let userEmail = document.querySelector('#user-email')
let loc = JSON.parse(localStorage.getItem('user'))
userEmail.innerHTML = loc.email