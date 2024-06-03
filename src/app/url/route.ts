import { handleError } from '@/utils/error'
import { generateShortId } from '@/utils/id'
import prisma from '@/utils/prisma'
import { createUrlSchema } from '@/utils/schema'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { original } = await request.json().then(createUrlSchema.parse)
    const short = await generateShortId()
    const newUrl = await prisma.url.create({
      data: { original, short },
    })
    return NextResponse.json(newUrl, { status: 201 })
  } catch (err) {
    const e = handleError(err)
    return NextResponse.json(e.message, { status: e.status })
  }
}
