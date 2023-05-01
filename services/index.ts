import { request } from '../utils'

export function createUrl({ url, shortCode }: { url: string; shortCode: string }): Promise<string> {
  return request.post('/api/link', {
    url,
    shortCode,
  })
}
