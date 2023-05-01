import _md5 from 'crypto-js/md5'

export default function md5(val: string) {
  return _md5(val).toString()
}
