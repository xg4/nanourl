import { handleError } from '@/utils/error'
import prisma from '@/utils/prisma'
import { redirect } from 'next/navigation'
import { NextResponse } from 'next/server'

export async function GET(
  req: Request,
  {
    params: { short },
  }: {
    params: { short: string }
  },
) {
  try {
    const url = await prisma.url.findUnique({
      where: { short },
    })
    if (url) {
      const userAgent = req.headers.get('user-agent')
      await prisma.accessLog.create({
        data: {
          url: { connect: { id: url.id } },
          userAgent,
        },
      })
      return NextResponse.redirect(url.original)
    }
  } catch (err) {
    const e = handleError(err)
    return NextResponse.json(e.message, { status: e.status })
  }
  redirect('/')
}
