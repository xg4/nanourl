import base62 from 'base62'

export function isURL(url: string) {
  return /^https?:\/\//.test(url)
}

export function getShortCode(id: number): string {
  return base62.encode(id).padStart(6, '0')
}

export function getIdByShortCode(base62Str: string): number {
  return base62.decode(base62Str)
}
