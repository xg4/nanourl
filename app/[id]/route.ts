import { isShortCode } from '@/utils/validate'
import { PrismaClient } from '@prisma/client'
import { redirect } from 'next/navigation'
import { NextResponse } from 'next/server'

export async function GET(
  _: Request,
  {
    params,
  }: {
    params: { id: string }
  },
) {
  const shortCode = params.id
  if (!isShortCode(shortCode)) {
    redirect('/')
  }

  const prisma = new PrismaClient()
  try {
    const url = await prisma.link.findUnique({
      where: {
        shortCode,
      },
    })
    if (url) {
      await prisma.link.update({
        where: {
          id: url.id,
        },
        data: {
          clicks: url.clicks + 1,
        },
      })
      return NextResponse.redirect(url.originalUrl, { status: 302 })
    }
  } catch (err) {
    console.log(err)
  }

  redirect('/')
}
