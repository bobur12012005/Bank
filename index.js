import {
	createHeader,
	reloadCards,
	reloadTransactions
} from "/modules/ui.js"
import {
	getData
} from "./modules/http.request"

let greeting = document.querySelector('#greeting')
let userEmail = document.querySelector('#user-email')
let header = document.querySelector('header .inner-header')
let cardContainer = document.querySelector('.card-container')
let transactionContainer = document.querySelector('.transaction-container')

let loc = JSON.parse(localStorage.getItem('user'))
greeting.innerHTML = `Добро пожаловать, ${loc.name}`
userEmail.innerHTML = loc.email

createHeader(header)

getData('/cards?userId=' + loc.id)
	.then(res => {
		console.log(res);
		if (res.length === 0) {
			cardContainer.innerHTML = 'У вас нет кошельков. Что-бы добавить переходите на вкладку "Мои кошельки" </br> или кликните по ссылке снизу.'
			cardContainer.classList.add('empty-container')
		} else {
			cardContainer.classList.remove('empty-container')
			reloadCards(res.splice(0, 4), cardContainer)
		}
	})


getData('/transactions?userId=' + loc.id)
	.then(res => {
		reloadTransactions(res, transactionContainer)
	})