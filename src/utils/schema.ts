import { z } from 'zod'

export const createUrlSchema = z.object({
  original: z.string().url('Invalid url'),
})

export type CreateUrlInput = z.infer<typeof createUrlSchema>
