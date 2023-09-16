let name = prompt('What is your name?').toLowerCase().trim()
if (name === 'alex') {

    let account = +prompt('Enter your bank PIN.')
    if(account === 7777) {
        
        let money = +prompt('How much to cash out?')
        if (money <= 10000 && money > 0) {
            alert('Everything is fine!')
            alert(10000 - money)
        } else {
            alert('You do not have enough money!')
        }

    } else {
        alert('User is not found!')
    }

} else {
    alert('User is not found!')
}