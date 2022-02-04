import FetchWrapper from './fetch-wrapper.js'
import {startLoader, stopLoader} from './helpers.js'

const API = new FetchWrapper("https://api.github.com/users")
const form = document.querySelector('#repos-form')
const username = document.querySelector('#github-username')
const list = document.querySelector('#repos-list')
const button = document.querySelector("#get-repos")

const getRepos = () => {
    API.get(`/${username.value}/repos`)
    .then(data => {
        list.innerHTML = ""
        data.forEach(data => {
            console.log(data.name)
            console.log(data.description)
            if(data.description){
                list.insertAdjacentHTML("beforeend", `<li><a href="${data.html_url}" target="_blank"><h2>${data.full_name}</h2><a><p>${data.description}</p></li>`)
            }else{
                list.insertAdjacentHTML("beforeend", `<li><a href="${data.html_url}" target="_blank"><h2>${data.full_name}</h2><a><p>No description</p></li>`)
            }
        })
    }).then(error => {
        console.log(error)
    }).finally(() => {
        stopLoader(button, 'Get repos')
    })
}
form.addEventListener('submit', event => {
    event.preventDefault()

    startLoader(button)
    getRepos()

})