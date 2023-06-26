import { CreateUrlType } from '@/types'
import { encodeId } from '@/utils/id'
import { Link } from '@prisma/client'
import createHttpError from 'http-errors'
import prisma from '../utils/prisma'

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

function findLinkByCode(shortCode: string) {
  return prisma.link.findUnique({
    where: { shortCode },
  })
}

export async function createLink({ url: originalUrl, expiresAt, shortCode }: CreateUrlType) {
  if (shortCode) {
    if (await findLinkByCode(shortCode)) {
      throw new createHttpError.BadRequest(`Short code already exists: ${shortCode}`)
    }
  }

  const link = await prisma.link.create({
    data: {
      originalUrl,
      expiresAt,
      shortCode,
    },
  })

  if (link.shortCode) {
    return link
  }

  return generateCode(link)
}
