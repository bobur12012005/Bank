import axios from "axios"
import { isError } from "../../modules/status.js"

let baseURL = import.meta.env.VITE_BASE_URL
let form = document.forms.namedItem('sign-in')

let pattern = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
}

form.onsubmit = (event) => {
    event.preventDefault()

    let fm = new FormData(event.target)

    let user = {
        email: fm.get('email'),
        password: fm.get('password')
    }

    let { email, password } = user

    if (!email || !pattern.email.test(email) || password.length < 4) {
        isError('error', 'Fill both of the fields correctly!')
        return
    }

    axios.get(baseURL + "/users?email=" + email)
        .then(res => {
            if (res.data.length === 0) {
                isError('error', 'User is not found!')
                return
            }

            let [data] = res.data

            if (data.password === password) {
                isError('success', '')
                delete data.password
                localStorage.setItem('user', JSON.stringify(data))
                setTimeout(() => {
                    location.assign('/')
                }, 3300)
            } else {
                isError('error', 'Wrong password!')
            }
        })
}