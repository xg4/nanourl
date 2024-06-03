import { nanoid } from 'nanoid'
import prisma from './prisma'

const ID_LENGTH = 4 // 初始ID长度

export async function generateShortId(index = 0, length = ID_LENGTH) {
  const shortId = nanoid(length)
  const url = await prisma.url.findUnique({
    where: { short: shortId },
  })
  if (!url) {
    return shortId
  }
  if (index >= Math.pow(length, 2)) {
    length += 1
    index = 0
  } else {
    index += 1
  }
  return generateShortId(index, length)
}
