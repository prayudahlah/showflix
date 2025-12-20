import axios from "axios";
import type { ApiError } from "../types/error";

const BASE_URL = import.meta.env.VITE_API_BASE_URL

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 5000
})

api.interceptors.response.use(
  (res) => {
    return res
  }, (err) => {
    const status = err.response?.status
    const data = err.response?.data

    return Promise.reject({
      status,
      data: data ? camelcaseKeys(data, { deep: true }) : null,
      message: data?.message ?? err.message,
      raw: err
    })
  }
)
