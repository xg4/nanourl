import validateShortCode from '@/utils'
import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const shortCode = req.query.id
  if (!validateShortCode(shortCode)) {
    res.redirect(302, '/')
    return
  }

  const prisma = new PrismaClient()
  try {
    const url = await prisma.link.findUnique({
      where: {
        shortCode,
      },
    })

    if (url) {
      await prisma.link.update({
        where: {
          id: url.id,
        },
        data: {
          clicks: url.clicks + 1,
        },
      })
      res.redirect(302, url.originalUrl)
      return
    }
  } catch (err) {
    console.log(err)
  }

  res.redirect(302, '/')
}
