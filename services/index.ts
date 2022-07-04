import { request } from '../helpers/request'

export function shortUrl(url: string): Promise<string> {
  return request.post('/api/link', {
    url,
  })
}
