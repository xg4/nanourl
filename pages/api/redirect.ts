import { Link } from '@prisma/client'
import { isString } from 'lodash'
import { NextApiRequest, NextApiResponse } from 'next'
import { urlCache } from '../../lib/cache'
import { prisma } from '../../lib/prisma'
import { getIdByShortCode } from '../../util/shared'

const debug = require('debug')('api:redirect')

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const base62Str = req.query.id
  if (!isString(base62Str)) {
    res.redirect(302, '/')
    return
  }

  try {
    let url: Link | null | undefined
    url = urlCache.get(base62Str)
    if (!url) {
      const id = getIdByShortCode(base62Str)
      url = await prisma.link.findUnique({
        where: {
          id,
        },
      })
    }

    if (url) {
      urlCache.set(base62Str, url)
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
    debug(err)
  }

  res.redirect(302, '/')
}
