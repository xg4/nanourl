import dayjs from 'dayjs'
import { z } from 'zod'

export const shortCodeSchema = z.string().regex(/^[0-9A-Za-z_-]{3,}$/, 'Invalid short code')

export const createUrlSchema = z.object({
  url: z.string().url('Invalid url'),
  shortCode: shortCodeSchema.optional(),
  expiresAt: z.union([z.number(), z.string()]).pipe(z.coerce.date()).optional(),
})

export function isExpiredUrl(d: Date | null) {
  if (!d) {
    return false
  }
  return dayjs().isAfter(d)
}
