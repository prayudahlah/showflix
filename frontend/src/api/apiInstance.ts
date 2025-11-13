import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 5000
})

api.interceptors.response.use(
  (res) => {
    return res
  }, (err) => {
    return Promise.reject(err)
  }
)
