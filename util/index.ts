import crypto from 'crypto'
import { encode } from '../lib/base62'

export function isURL(url: string) {
  return /^https?:\/\//.test(url)
}

export function generateShortCode(id: number) {
  return encode(id).padStart(6, '0')
}

export function md5(value: string) {
  return crypto.createHash('md5').update(value).digest('hex')
}
