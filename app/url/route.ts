import { createShortCodeByLink, getUrlByHash } from '@/server/services'
import prisma from '@/server/utils/prisma'
import md5 from '@/utils/md5'
import { SHORT_CODE_PATTERN } from '@/utils/validate'
import { NextResponse } from 'next/server'
import { z } from 'zod'

const createUrlSchema = z.object({
  url: z.string().url('Invalid url'),
  shortCode: z.string().regex(SHORT_CODE_PATTERN, 'Invalid short code').optional(),
})

export async function POST(request: Request) {
  const jsonData = await request.json()
  const validationResult = createUrlSchema.safeParse(jsonData)
  if (!validationResult.success) {
    const { issues } = validationResult.error
    return NextResponse.json(Object.fromEntries(issues.map(e => [e.path.join('.'), e.message])), { status: 400 })
  }
  const { url, shortCode } = validationResult.data

  try {
    const hash = md5(url)
    const _url = await getUrlByHash(url, hash)
    if (_url) {
      return NextResponse.json(_url.shortCode)
    }

    if (!shortCode) {
      const partialLink = await prisma.link.create({
        data: {
          hash,
          originalUrl: url,
        },
      })
      const link = await createShortCodeByLink(partialLink)

      return NextResponse.json(link.shortCode, { status: 201 })
    }

    const _shortCode = await prisma.link.findUnique({
      where: { shortCode },
    })
    if (_shortCode) {
      return NextResponse.json(`ShortCode already exists: ${shortCode}`, { status: 400 })
    }

    await prisma.link.create({
      data: {
        hash,
        shortCode,
        originalUrl: url,
      },
    })
    return NextResponse.json(shortCode, { status: 201 })
  } catch (err) {
    console.log(err)
  }

  return NextResponse.json('Internal Server Error', { status: 500 })
}
