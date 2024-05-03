import { createHeader, reloadTransactions } from "../../modules/ui.js"

let array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
let header = document.querySelector('header .inner-header')
let container = document.querySelector('.transaction-container')

createHeader(header)
reloadTransactions(array, container)