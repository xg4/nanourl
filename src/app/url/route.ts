import { createLink } from '@/server/services'
import { createUrlSchema } from '@/utils/validate'
import createHttpError from 'http-errors'
import { NextResponse } from 'next/server'
import { z } from 'zod'

export async function POST(request: Request) {
  try {
    const data = await request.json().then(createUrlSchema.parse)

    const link = await createLink(data)

    return NextResponse.json(link.shortCode, { status: 201 })
  } catch (err) {
    if (err instanceof z.ZodError) {
      const e = err.issues.pop()
      return NextResponse.json(e?.message, { status: 400 })
    }
    if (createHttpError.isHttpError(err)) {
      return NextResponse.json(err.message, { status: err.status })
    }
    console.log(err)
  }

  return NextResponse.json('Internal Server Error', { status: 500 })
}
