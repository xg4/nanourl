import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'
import { generateShortCode, isURL, md5 } from '../../util'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { url } = req.body
  if (!url || !isURL(url)) {
    res.status(500).json(`Invalid url: ${url}`)
    return
  }

  try {
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
    console.log(err)
    res.status(500).json('Internal Server Error')
  }
}
