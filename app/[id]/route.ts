import { isExpiredUrl, shortCodeSchema } from '@/schema'
import prisma from '@/server/utils/prisma'
import { redirect } from 'next/navigation'
import { NextResponse } from 'next/server'
import { z } from 'zod'

const paramsSchema = z.object({
  id: shortCodeSchema,
})

export async function GET(
  _: Request,
  {
    params,
  }: {
    params: { id: string }
  },
) {
  try {
    const { id: shortCode } = paramsSchema.parse(params)
    const url = await prisma.link.findUnique({
      where: {
        shortCode,
      },
    })
    if (url && !isExpiredUrl(url.expiresAt)) {
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
