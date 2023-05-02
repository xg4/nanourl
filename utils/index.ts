import { random, shuffle } from 'lodash'

export * from './base62'
export * from './request'

export default function validateShortCode(value: any): value is string {
  return /^[0-9A-Za-z]{4,6}$/.test(value)
}

export function generateShortCode(): string {
  const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  return shuffle(characters.split('')).join('').slice(0, random(4, 6))
}
