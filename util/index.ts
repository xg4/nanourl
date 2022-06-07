import base62 from 'base62'
import crypto from 'crypto'

export function isURL(url: string) {
  return /^https?:\/\//.test(url)
}

export function generateShortCode(id: number) {
  return base62.encode(id).padStart(6, '0')
}

export function md5(value: string) {
  return crypto.createHash('md5').update(value).digest('hex')
}
