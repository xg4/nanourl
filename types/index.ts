import { createUrlSchema } from '@/utils/validate'
import { z } from 'zod'

export interface GenerateUrl {
  originalUrl: string
  shortUrl: string
}

export type CreateUrlType = z.infer<typeof createUrlSchema>
