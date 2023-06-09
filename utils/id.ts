import CryptoJS from 'crypto-js'

export function encodeId(id: number, prefix = '') {
  const id36 = prefix + id.toString(36).padStart(4, '0')
  return CryptoJS.enc.Utf8.parse(id36).toString(CryptoJS.enc.Base64url)
}

export function decodeId(base64Str: string) {
  const id36 = CryptoJS.enc.Base64url.parse(base64Str).toString(CryptoJS.enc.Utf8)
  return parseInt(id36, 36)
}
