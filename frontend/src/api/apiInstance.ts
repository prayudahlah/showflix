import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3001/api/",
  timeout: 5000
})

api.interceptors.response.use(
  (res) => {
    return res
  }, (err) => {
    return Promise.reject(err)
  }
)
