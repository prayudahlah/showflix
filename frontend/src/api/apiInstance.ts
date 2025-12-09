import axios, { AxiosError } from "axios";
import camelcaseKeys from 'camelcase-keys';
import type { ApiError } from "../types/error";

const BASE_URL = import.meta.env.VITE_API_BASE_URL

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 5000
})

api.interceptors.response.use(
  (res) => {
    res.data = camelcaseKeys(res.data, { deep: true });
    return res
  }, (err: AxiosError) => {
    return Promise.reject(err as ApiError)
  }
)
