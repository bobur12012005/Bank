import { createHeader, reloadCards, reloadTransactions } from "/modules/ui.js"

let greeting = document.querySelector('#greeting')
let userEmail = document.querySelector('#user-email')

let loc = JSON.parse(localStorage.getItem('user'))
greeting.innerHTML = `Добро пожаловать, ${loc.name}`
userEmail.innerHTML = loc.email

let header = document.querySelector('header .inner-header')
createHeader(header)

let cardContainer = document.querySelector('.card-container')
let array = [1, 2, 3, 4]
reloadCards(array, cardContainer)

let transactionContainer= document.querySelector('.transaction-container')
let array2 = [1, 2, 3, 4, 5, 6, 7, 8, 9]
reloadTransactions(array2, transactionContainer)