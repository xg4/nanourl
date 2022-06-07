import base62 from 'base62'

export function isURL(url: string) {
  return /^https?:\/\//.test(url)
}

export function getShortCode(id: number): string {
  const allCount = 62 ** 6
  return base62
    .encode(id >= allCount ? allCount - id : allCount / 2 - id)
    .padStart(6, '0')
}

export function getIdByShortCode(base62Str: string): number {
  const allCount = 62 ** 6
  const id = base62.decode(base62Str)
  return id >= allCount ? allCount - id : allCount / 2 - id
}
