import { isError } from "../../modules/status.js"
import { getData, patchData, postData, user } from "../../modules/http.request.js"

let form = document.forms.namedItem('transaction-adding')
let wallets_all = []
const select = document.querySelector('select')

getData('/cards?userId=' + user.id)
    .then(res => {
        for (let item of res) {
            let opt = new Option(item.name, item.id)
            select.append(opt)
        }
        wallets_all = res
    })

form.onsubmit = (event) => {
    event.preventDefault()

    let fm = new FormData(event.target)

    let transaction = {
        id: String(Math.floor(Math.random() * 100000000)),
        userId: user.id,
        walletId: fm.get('wallet'),
        amount: fm.get('amount'),
        category: fm.get('category'),
        time: new Date().toLocaleDateString(),
        wallet: {}
    }

    let {
        fromCard,
        amount,
        category
    } = transaction

    if (fromCard === "" || amount === "" || category === "") {
        isError('error', 'Fill all the fields!')
        return
    }

    const wallet_current = wallets_all.find(wallet => wallet.id === transaction.walletId)
    delete wallet_current.id
    delete wallet_current.userId

    transaction.wallet = wallet_current

    patchData('/cards/' + transaction.walletId, {
        balance: String(Number(wallet_current.balance) - Number(transaction.amount))
    })
        .then(() => {
            postData('/transactions/', transaction)
            location.assign('/pages/transactions/')
        })
}