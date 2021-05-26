const b62ch = '0123456789abcdefghigklmnopqrstuvwxyzABCDEFGHIGKLMNOPQRSTUVWXYZ'

export function encode(quotient: number) {
  const chars = b62ch.split('')
  const radix = chars.length
  const arr = []
  let mod: number
  do {
    mod = quotient % radix
    quotient = (quotient - mod) / radix
    arr.unshift(chars[mod])
  } while (quotient)
  return arr.join('')
}

export function decode(numberCode: string) {
  const chars = b62ch
  const radix = chars.length
  const len = numberCode.length
  let i = 0
  let originNumber = 0
  while (i < len) {
    originNumber +=
      Math.pow(radix, i++) * chars.indexOf(numberCode.charAt(len - i) || '0')
  }
  return originNumber
}
