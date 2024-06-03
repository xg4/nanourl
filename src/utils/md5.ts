import MD5 from 'crypto-js/md5'

export default function md5(val: string) {
  return MD5(val).toString()
}
