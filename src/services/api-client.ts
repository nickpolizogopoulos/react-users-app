import axios, { CanceledError } from "axios";

export default axios.create({
    baseURL: 'http://jsonplaceholder.typicode.com'
})

export { CanceledError };