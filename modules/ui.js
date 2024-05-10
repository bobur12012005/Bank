export function createHeader(email, place) {
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
    emailLink.innerHTML = email

    leaveButtonIcon.src = '/icons/leave.svg'

    mainLink.href = '/'
    cardLink.href = '/pages/cards/'
    transactionLink.href = '/pages/transactions/'
    emailLink.href = '#'

    place.append(leftLinks, rightLinks)
    leftLinks.append(mainLink, cardLink, transactionLink)
    rightLinks.append(emailLink, leaveButton)
    leaveButton.append(leaveButtonIcon)

    leaveButton.onclick = () => {
        let result = confirm("Вы уверены что хотите выйти из аккаунта?")

        if (result !== true) return
        localStorage.removeItem("user");
        location.assign('/pages/sign-in/')
    }

    let links = [mainLink, cardLink, transactionLink]

    links.forEach(link => {
        link.onclick = () => {
            localStorage.setItem('activeLink', link.href)
            let activeLink = localStorage.getItem('activeLink')

            if (activeLink) {
                let activeLinkElement = links.find(l => l.href === activeLink)
                if (activeLinkElement) {
                    links.forEach(l => l.style.color = 'black')
                    activeLinkElement.style.color = 'blue'
                }
            }
        }
    })
}

function geneateRGB() {
    function random(up) {
        return Math.ceil(Math.random() * up)
    }

    let r = random(255)
    let g = random(255)
    let b = random(255)

    return `rgb(${r}, ${g}, ${b})`
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

        card.style.cursor = 'pointer'

        cardType.innerHTML = item.name
        cardCurrency.innerHTML = item.currency

        card.style.background = `linear-gradient(90deg,${geneateRGB()}, ${geneateRGB()})`

        console.log(geneateRGB());
        place.append(card)
        card.append(cardType, cardCurrency)

        card.onclick = () => {
            location.assign('/pages/card-view/')
        }
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

        transactionCardId.innerHTML = item.id
        transactionCardType.innerHTML = item.wallet.name
        transactionCategory.innerHTML = item.category
        transactionAmount.innerHTML = `${item.wallet.currency}: ${item.amount}`
        transactionTime.innerHTML = item.time

        place.append(transaction)
        transaction.append(transactionCardId, transactionCardType, transactionCategory, transactionAmount, transactionTime)
    }
}