import validateShortCode from '@/utils'
import md5 from '@/utils/md5'
import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'
import isURL from 'validator/lib/isURL'

export default async function handler(req: NextApiRequest, res: NextApiResponse<string>) {
  const { url, shortCode } = req.body
  if (!isURL(url)) {
    res.status(400).json(`Invalid url: ${url}`)
    return
  }

  if (!validateShortCode(shortCode)) {
    res.status(400).json(`Invalid shortCode: ${shortCode}`)
    return
  }

  const prisma = new PrismaClient()
  try {
    const hash = md5(url)

    const existedUrl = await prisma.link.findUnique({
      where: { hash },
    })
    if (existedUrl) {
      res.json(existedUrl.shortCode)
      return
    }
    const existedShortCode = await prisma.link.findUnique({
      where: { shortCode },
    })
    if (existedShortCode) {
      res.status(400).json(`ShortCode already exists: ${shortCode}`)
      return
    }
    await prisma.link.create({
      data: {
        hash,
        shortCode,
        originalUrl: url,
      },
    })
    res.json(shortCode)
  } catch (err) {
    console.log(err)
    res.status(500).json('Internal Server Error')
  }
}
