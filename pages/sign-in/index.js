import axios from "axios"
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
        alert('Eroor! Fill both of the fields correctly!')
        return
    }

    axios.get(baseURL + "/users?email=" + email)
        .then(res => {
            if (res.data.length === 0) {
                alert('User is not found!')
                return
            }

            let [data] = res.data

            if (data.password === password) {
                delete data.password
                localStorage.setItem('user', JSON.stringify(data))
                location.assign('/pages/main/')
            }  else {
                alert('Wrong password!')
            }
        })
}