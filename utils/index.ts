export * from './base62'
export * from './request'

export default function validateShortCode(value: any): value is string {
  return /^[0-9A-Za-z]{4,6}$/.test(value)
}
