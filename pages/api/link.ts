import { PrismaClient } from '@prisma/client'
import { NextApiHandler } from 'next'
import { generateShortCode, isURL, md5 } from '../../util'

const debug = require('debug')('api:link')

const handler: NextApiHandler = async (req, res) => {
  const url = req.body.url as string
  if (
    !url ||
    !isURL(url) ||
    (req.headers.origin && url.startsWith(req.headers.origin))
  ) {
    res.status(500).json(`Invalid url: ${url}`)
    return
  }

  try {
    const prisma = new PrismaClient()
    const hash = md5(url)
    const existedUrl = await prisma.link.findUnique({
      where: { hash },
    })

    if (existedUrl) {
      res.status(200).json(generateShortCode(existedUrl.id))
      return
    }

    const newUrl = await prisma.link.create({
      data: {
        origin: url,
        hash,
      },
    })
    res.status(201).json(generateShortCode(newUrl.id))
  } catch (err) {
    debug(err)
    res.status(500).json('Internal Server Error')
  }
}

export default handler
