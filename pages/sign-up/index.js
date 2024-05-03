import axios from "axios"
let baseURL = import.meta.env.VITE_BASE_URL
let form = document.forms.namedItem('sign-up')

let patterns = {
    name: /^[A-Za-z]{1,30}$/,
    surname: /^[A-Za-z]{1,30}$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
}

form.onsubmit = (event) => {
    event.preventDefault()

    let fm = new FormData(event.target)

    let user = {
        id: String(Math.random()),
        name: fm.get('name'),
        surname: fm.get('surname'),
        email: fm.get('email'),
        password: fm.get('password')
    }

    let { name, surname, email, password } = user

    if (!name || !patterns.name.test(name) || !surname || !patterns.surname.test(surname) || !email || !patterns.email.test(email) || password.length < 4) {
        alert('Eroor! Fill all the fields correctly!')
        return
    }

    axios.get(baseURL + "/users?email=" + email)
        .then(res => {
            if (res.data.length > 0) {
                alert('User already exists!')
                return
            }

            axios.post(baseURL + '/users', user)
                .then(res => {
                    if (res.status == 200 || res.status === 201) {
                        location.assign('/pages/main/')
                    }
                })
        })
}