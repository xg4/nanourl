import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'
import { decode62To10 } from '../../util'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const id = req.query.id as string
    const decodeId = decode62To10(id)
    const url = await prisma.link.findUnique({
      where: {
        id: decodeId,
      },
    })

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
