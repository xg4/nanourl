import CryptoJS from 'crypto-js'

export default function md5(val: string) {
  return CryptoJS.MD5(val).toString()
}
