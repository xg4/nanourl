import { notification } from 'antd'
import axios from 'axios'
import get from 'lodash/get'
import isString from 'lodash/isString'

export const request = axios.create()

request.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    const message = get(error, 'response.data') || get(error, 'response.statusText')
    if (isString(message)) {
      notification.error({
        message,
      })
      return Promise.reject(message)
    }
    return Promise.reject(error)
  },
)
