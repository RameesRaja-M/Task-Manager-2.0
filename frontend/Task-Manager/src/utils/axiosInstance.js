import axios from "axios"
import { BASE_URL } from "./apiPaths.js"

const axiosInstence = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
    },
})

// REQUEST INTERCEPTOR
axiosInstence.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("token")
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

// RESPONSE INTERCEPTOR
axiosInstence.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        // handle error globally
        if (error.response) {
            if (error.response.status === 401) {
                // Redirect to login page
                window.location.href = "/login"
            } else if (error.response.status === 500) {
                console.error("Server Error, Please Try Again");
            }
        } else if (error.code === "ECONNABORTED") {
            console.error("Request Timeout, Please Try Again")
        }
    }
)

export default axiosInstence