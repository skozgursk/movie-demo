import axios, { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from "axios";

const apiKey = process.env.REACT_APP_API_KEY

const storeAPI = 'https://www.omdbapi.com/'

export const apiInstance: AxiosInstance = axios.create({
    baseURL: storeAPI
})

apiInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        config.params = {
            ...config.params,
            apikey: apiKey,
        };

        return config
    },
    (error) => {
        throw error
    }
)

apiInstance.interceptors.response.use(
    (response: AxiosResponse) => {
        if (response.status === 200 && response.data.Response !== "False") {
            return response.data
        } else {
            throw Error(response.data.Error)
        }
    },
    (error: AxiosError) => {
        throw Error('Something Went Very Bad')
    }
)