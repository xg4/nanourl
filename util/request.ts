import axios from 'axios'

export const request = axios.create({})

request.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    if (error.response) {
      return Promise.reject(error.response.data || error.response.statusText)
    }
    return Promise.reject(error)
  }
)
