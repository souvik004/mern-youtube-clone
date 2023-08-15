import axios from 'axios'

const BASEURL = 'http://localhost:3500/api'

export const apiPublicRequest = axios.create({
    baseURL: BASEURL
})

export const axiosPrivate = axios.create({
    baseURL: BASEURL,
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
})