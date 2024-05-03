export function createHeader(place) {
    let leftLinks = document.createElement('div')
    let rightLinks = document.createElement('div')
    let mainLink = document.createElement('a')
    let cardLink = document.createElement('a')
    let transactionLink = document.createElement('a')
    let emailLink = document.createElement('a')
    let leaveButton = document.createElement('button')
    let leaveButtonIcon = document.createElement('img')

    leftLinks.classList.add('leftLinks')
    rightLinks.classList.add('rightLinks')

    mainLink.innerHTML = 'Главная'
    cardLink.innerHTML = 'Мои кошельки'
    transactionLink.innerHTML = 'Мои транзакции'
    emailLink.innerHTML = 'bank@gmail.com'

    leaveButtonIcon.src = '/public/icons/leave.svg'

    mainLink.href = '/pages/main/'
    cardLink.href = '/pages/cards/'
    transactionLink.href = '/pages/transactions/'
    emailLink.href = '#'

    place.append(leftLinks, rightLinks)
    leftLinks.append(mainLink, cardLink, transactionLink)
    rightLinks.append(emailLink, leaveButton)
    leaveButton.append(leaveButtonIcon)

    leaveButton.onclick = () => {
        location.assign('/')
    }
}

export function reloadCards(arr, place) {
    place.innerHTML = ""

    for (let item of arr) {
        let card = document.createElement('div')
        let cardType = document.createElement('span')
        let cardCurrency = document.createElement('span')

        card.classList.add('card')
        cardType.classList.add('cardType')
        cardCurrency.classList.add('cardCurrency')

        cardType.innerHTML = 'visa'
        cardCurrency.innerHTML = 'rub'

        place.append(card)
        card.append(cardType, cardCurrency)
    }
}

export function reloadTransactions(arr, place) {
    place.innerHTML = ""

    for (let item of arr) {
        let transaction = document.createElement('div')
        let transactionCardId = document.createElement('span')
        let transactionCardType = document.createElement('span')
        let transactionCategory = document.createElement('span')
        let transactionAmount = document.createElement('span')
        let transactionTime = document.createElement('span')

        transaction.classList.add('transaction-row')
        transactionCardId.classList.add('transaction-card-id')
        transactionCardType.classList.add('transaction-card-type')
        transactionCategory.classList.add('transaction-category')
        transactionAmount.classList.add('transaction-amount')
        transactionTime.classList.add('transaction-time')

        transactionCardId.innerHTML = 1234567890
        transactionCardType.innerHTML = 'VISA'
        transactionCategory.innerHTML = 'Автомобиль'
        transactionAmount.innerHTML = '$400,000'
        transactionTime.innerHTML = '4 дня назад'

        place.append(transaction)
        transaction.append(transactionCardId, transactionCardType, transactionCategory, transactionAmount, transactionTime)
    }
}