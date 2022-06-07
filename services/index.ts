import { request } from '../lib'

export function shortUrl(url: string): Promise<string> {
  return request.post('/api/link', {
    url,
  })
}
