import { CreateUrlType } from '@/schema'
import ky from 'ky'

export const request = ky.create({
  timeout: 30 * 1e3,
})

export function createUrl(data: CreateUrlType) {
  return request.post('/url', { json: data }).json<string>()
}
