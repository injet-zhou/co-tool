import axios from 'axios'
import { requestErrorHanlder } from './interceptors'

const baseURL = import.meta.env.VITE_BASE_URL

axios.defaults.baseURL = baseURL

interface BaseResult {
    code: number
    msg: string
}

interface BaseDataResult extends BaseResult {
    data?: any
}

axios.interceptors.request.use(
    (config) => {
        // Do something before request is sent
        return config
    },
    (error) => {
        // Do something with request error
        return Promise.reject(error)
    }
)

// Add a response interceptor
axios.interceptors.response.use(
    (response) => {
        // Do something with response data
        return response.data
    },
    (error) => {
        requestErrorHanlder(error)
        return Promise.reject(error)
    }
)

const http = {
    get<T = BaseDataResult>(url: string, params?: any): Promise<T> {
        return axios.get(url, { params })
    },
    post<T = BaseDataResult>(url: string, data?: any): Promise<T> {
        return axios.post(url, data)
    },
    put<T = BaseDataResult>(url: string, data?: any): Promise<T> {
        return axios.put(url, data)
    },
    delete<T = BaseDataResult>(url: string, params?: any): Promise<T> {
        return axios.delete(url, { params })
    },
}

export default http
