import { Link, PrismaClient } from '@prisma/client'
import base62 from 'base62'
import { NextApiHandler } from 'next'
import { urlCache } from '../../lib/cache'

const debug = require('debug')('api:redirect')

const handler: NextApiHandler = async (req, res) => {
  try {
    const prisma = new PrismaClient()
    const id64 = req.query.id as string

    let url: Link | null | undefined
    url = urlCache.get(id64)
    if (!url) {
      const id = base62.decode(id64)
      url = await prisma.link.findUnique({
        where: {
          id,
        },
      })
      url && urlCache.set(id64, url)
    }

    if (url) {
      await prisma.link.update({
        where: {
          id: url.id,
        },
        data: {
          clickCount: url.clickCount + 1,
        },
      })
      res.redirect(301, url.origin)
      return
    }
  } catch (err) {
    debug(err)
  }

  res.redirect(301, '/')
}

export default handler
