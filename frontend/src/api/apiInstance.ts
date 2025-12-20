import axios from "axios";
import type { ApiError } from "../types/error";

const BASE_URL = import.meta.env.VITE_API_BASE_URL

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 6000
})

api.interceptors.response.use(
  (res) => {
    return res
  }, (err: ApiError) => {
    return Promise.reject(err)
  }
)
