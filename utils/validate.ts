export const SHORT_CODE_PATTERN = /^[0-9A-Za-z]{4,6}$/

export function isShortCode(value: any): value is string {
  return SHORT_CODE_PATTERN.test(value)
}
