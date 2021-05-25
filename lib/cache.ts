import { Link } from '@prisma/client'
import LRU from 'lru-cache'

export const urlCache = new LRU<string, Link>({
  max: 1000,
  maxAge: 24 * 60,
})
