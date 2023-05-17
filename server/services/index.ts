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
