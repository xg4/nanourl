import { request } from '../lib/request'

export function shortUrl(url: string): Promise<string> {
  return request.post('/api/link', {
    url,
  })
}
