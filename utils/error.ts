import { HTTPError } from 'ky'
import { get } from 'lodash'
import { toast } from 'react-hot-toast'
import { ZodError } from 'zod'

export function isZodError<T>(data: unknown): data is ZodError<T> {
  return get(data, 'name') === 'ZodError'
}

export async function toastError(err: unknown) {
  if (err instanceof HTTPError) {
    const responseErr = await err.response.json()
    if (typeof responseErr === 'string') {
      toast.error(responseErr)
      return
    }
    toast.error(err.message)
  }
}
