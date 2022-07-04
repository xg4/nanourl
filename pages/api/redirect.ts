import { PrismaClient } from '@prisma/client'
import { isString } from 'lodash'
import { NextApiRequest, NextApiResponse } from 'next'
import { getIdByShortCode } from '../../helpers'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prisma = new PrismaClient()

  const base62Str = req.query.id
  if (!isString(base62Str)) {
    res.redirect(302, '/')
    return
  }

  try {
    const id = getIdByShortCode(base62Str)
    const url = await prisma.link.findUnique({
      where: {
        id,
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
