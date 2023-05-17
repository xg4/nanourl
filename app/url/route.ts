import { getUrlByHash } from '@/server/services'
import prisma from '@/server/utils/prisma'
import md5 from '@/utils/md5'
import { isShortCode } from '@/utils/validate'
import { NextResponse } from 'next/server'
import isURL from 'validator/lib/isURL'

export async function POST(request: Request) {
  const res = await request.json()
  const { url, shortCode } = res
  if (!isURL(url)) {
    return NextResponse.json(`Invalid url: ${url}`, { status: 400 })
  }

  if (!isShortCode(shortCode)) {
    return NextResponse.json(`Invalid shortCode: ${shortCode}`, { status: 400 })
  }

  try {
    const hash = md5(url)
    const _url = await getUrlByHash(url, hash)
    if (_url) {
      return NextResponse.json(_url.shortCode)
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
