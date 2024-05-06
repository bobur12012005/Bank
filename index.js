import axios from "axios"
import { createHeader, reloadCards, reloadTransactions } from "/modules/ui.js"

let baseURL = import.meta.env.VITE_BASE_URL

let greeting = document.querySelector('#greeting')
let userEmail = document.querySelector('#user-email')

let loc = JSON.parse(localStorage.getItem('user'))
greeting.innerHTML = `Добро пожаловать, ${loc.name}`
userEmail.innerHTML = loc.email

let header = document.querySelector('header .inner-header')
createHeader(header)

let cardContainer = document.querySelector('.card-container')

axios.get(baseURL + '/cards')
    .then(res => {
        if (res.data.length === 0) {
            cardContainer.innerHTML = 'У вас нет кошельков. Что-бы добавить переходите на вкладку "Мои кошельки" </br> или кликните по ссылке снизу.'
            cardContainer.classList.add('empty-container')
        } else {
            cardContainer.classList.remove('empty-container')
            reloadCards(res.data, cardContainer)
        }
    })

let transactionContainer = document.querySelector('.transaction-container')
let array2 = [1, 2, 3, 4, 5, 6, 7, 8, 9]
reloadTransactions(array2, transactionContainer)