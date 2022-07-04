import { PrismaClient } from '@prisma/client'
import SHA256 from 'crypto-js/sha256'
import isString from 'lodash/isString'
import { NextApiRequest, NextApiResponse } from 'next'
import { getShortCode, isURL } from '../../helpers'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
  const prisma = new PrismaClient()

  const { url } = req.body
  if (!isString(url) || !isURL(url)) {
    res.status(400).json(`Invalid url: ${url}`)
    return
  }

  if (req.headers.origin && url.startsWith(req.headers.origin)) {
    res.status(400).json(`Can't link to your own domain: ${url}`)
    return
  }

  try {
    const hash = SHA256(url).toString()

    const existedUrl = await prisma.link.findUnique({
      where: { hash },
    })
    if (existedUrl) {
      res.json(getShortCode(existedUrl.id))
      return
    }
    const newUrl = await prisma.link.create({
      data: {
        hash,
        originalUrl: url,
      },
    })
    res.json(getShortCode(newUrl.id))
  } catch (err) {
    console.log(err)
    res.status(500).json('Internal Server Error')
  }
}
