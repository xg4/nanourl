import { CreateUrlType } from '@/types'
import { encodeId } from '@/utils/id'
import md5 from '@/utils/md5'
import { Link } from '@prisma/client'
import createHttpError from 'http-errors'
import prisma from '../utils/prisma'

async function getLinkByHash(originalUrl: string, hash: string) {
  if (originalUrl.length <= hash.length) {
    return prisma.link.findUnique({
      where: { originalUrl },
    })
  }
  return prisma.link.findUnique({
    where: { hash },
  })
}

async function generateCode(link: Link, prefix = ''): Promise<Link> {
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
  return generateCode(link, prefix + '0')
}

export async function createLink({ url: originalUrl, expiresAt, shortCode }: CreateUrlType) {
  const hash = md5(originalUrl)
  const _link = await getLinkByHash(originalUrl, hash)
  if (_link) {
    return _link
  }

  if (shortCode) {
    const existing = await prisma.link.findUnique({
      where: { shortCode },
    })
    if (existing) {
      throw new createHttpError.BadRequest(`Short code already exists: ${shortCode}`)
    }
  }

  const link = await prisma.link.create({
    data: {
      hash,
      originalUrl,
      expiresAt,
      shortCode,
    },
  })

  if (shortCode) {
    return link
  }

  return generateCode(link)
}
