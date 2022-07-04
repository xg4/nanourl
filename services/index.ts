import { request } from '../helpers'

export function shortUrl(url: string): Promise<string> {
  return request.post('/api/link', {
    url,
  })
}
