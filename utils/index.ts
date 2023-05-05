import { message } from 'antd'
import { isAxiosError } from 'axios'
import { get, isString, random, shuffle } from 'lodash'

export * from './base62'
export * from './request'

export default function validateShortCode(value: any): value is string {
  return /^[0-9A-Za-z]{4,6}$/.test(value)
}

const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')

export function generateShortCode(): string {
  return shuffle(characters).slice(0, random(4, 6)).join('')
}

export function toastError(error: unknown) {
  if (isAxiosError(error)) {
    const errMsg = get(error, 'response.data')
    if (errMsg && isString(errMsg)) {
      message.error(errMsg)
    } else {
      message.error('Internal Server Error')
    }
    return
  }
  if (error instanceof Error) {
    message.error(error.message)
  }
}
