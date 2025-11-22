import axios from "axios";
import camelcaseKeys from 'camelcase-keys';

const BASE_URL = import.meta.env.VITE_API_BASE_URL

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 5000
})

api.interceptors.response.use(
  (res) => {
    res.data = camelcaseKeys(res.data, { deep: true });
    return res
  }, (err) => {
    return Promise.reject(err)
  }
)
