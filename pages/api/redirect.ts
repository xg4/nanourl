import { Link, PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'
import { decode } from '../../lib/base62'
import { urlCache } from '../../lib/cache'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const prisma = new PrismaClient()
    const id64 = req.query.id as string

    let url: Link
    url = urlCache.get(id64)
    if (!url) {
      const id = decode(id64)
      url = await prisma.link.findUnique({
        where: {
          id,
        },
      })
      urlCache.set(id64, url)
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
    console.log(err)
  }

  res.redirect(301, '/')
}
