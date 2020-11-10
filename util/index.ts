import crypto from 'crypto'

const NUMBER_STRING =
  '0123456789abcdefghigklmnopqrstuvwxyzABCDEFGHIGKLMNOPQRSTUVWXYZ'

export function encode10To62(num: number) {
  const chars = NUMBER_STRING.split('')
  const radix = chars.length
  const arr = []

  let mod: number
  let quotient = num

  do {
    mod = quotient % radix
    quotient = (quotient - mod) / radix
    arr.unshift(chars[mod])
  } while (quotient)
  return arr.join('')
}

export function isURL(url: string) {
  return /^https?\:\/\//.test(url)
}

export function decode62To10(num: string) {
  const chars = NUMBER_STRING
  const radix = chars.length
  const numberCode = String(num)
  const len = numberCode.length
  let i = 0
  let originNumber = 0
  while (i < len) {
    originNumber +=
      Math.pow(radix, i++) * chars.indexOf(numberCode.charAt(len - i) || '0')
  }
  return originNumber
}

export function generateShortCode(id: number) {
  return encode10To62(id).padStart(6, '0')
}

export function md5(value: string) {
  return crypto.createHash('md5').update(value).digest('hex')
}
