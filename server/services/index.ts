import { encodeId } from '@/utils/id'
import { Link } from '@prisma/client'
import prisma from '../utils/prisma'

export async function getUrlByHash(originalUrl: string, hash: string) {
  if (originalUrl.length <= hash.length) {
    return prisma.link.findUnique({
      where: { originalUrl },
    })
  }
  return prisma.link.findUnique({
    where: { hash },
  })
}

export async function createShortCodeByLink(link: Link, prefix = ''): Promise<Link> {
  const shortCode = encodeId(link.id, prefix)

  const _link = await prisma.link.findUnique({
    where: { shortCode },
  })
  if (!_link) {
    return prisma.link.update({
      where: {
        id: link.id,
      },
      data: {
        shortCode,
      },
    })
  }
  return createShortCodeByLink(link, prefix + '0')
}
