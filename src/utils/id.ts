import Base64url from 'crypto-js/enc-base64url'
import Utf8 from 'crypto-js/enc-utf8'

export function encodeId(id: number, prefix = '') {
  const id36 = prefix + id.toString(36).padStart(2, '0')
  return Utf8.parse(id36).toString(Base64url)
}

export function decodeId(base64Str: string) {
  const id36 = Base64url.parse(base64Str).toString(Utf8)
  return parseInt(id36, 36)
}
