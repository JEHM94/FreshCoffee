import axios from "axios";

const clienteAxios = axios.create({
    /* baseURL: import.meta.env.VITE_API_URL, */
    baseURL: 'https://jehm-freshcoffee.alwaysdata.net',
    headers: {
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
    },
    withCredentials: true
})

export default clienteAxios