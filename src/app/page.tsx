'use client'

import { URL_STORAGE_KEY } from '@/constants'
import { toastError } from '@/utils/error'
import { request } from '@/utils/request'
import { CreateUrlInput, createUrlSchema } from '@/utils/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Url } from '@prisma/client'
import dynamic from 'next/dynamic'
import { useCallback, useLayoutEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useLocalStorage } from 'usehooks-ts'

const Table = dynamic(() => import('@/components/Table'), {
  ssr: false,
})

export default function Home() {
  const [_, setList] = useLocalStorage<Url[]>(URL_STORAGE_KEY, [])

  const append = useCallback(
    (data: Url) => {
      setList(prev => [...prev, data])
    },
    [setList],
  )

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateUrlInput>({
    resolver: zodResolver(createUrlSchema),
  })

  const onSubmit = useCallback(
    (data: CreateUrlInput) =>
      request.post('/url', { json: data }).json<Url>().then(append).catch(toastError).finally(reset),
    [append, reset],
  )

  const [location, setLocation] = useState<Location>()
  useLayoutEffect(() => {
    setLocation(window.location)
  }, [])

  return (
    <div className="container prose prose-slate mx-auto space-y-10 px-4 pt-20 dark:prose-invert">
      <h2 className="text-center">Nano URL</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full min-w-max items-center space-x-2 rounded-md p-2 shadow-md"
      >
        <label className="hidden sm:inline-block" htmlFor="urlInput">
          <b>{location?.host}</b>
        </label>

        <input
          {...register('original')}
          className="h-9 flex-1 bg-transparent px-2.5 text-base leading-none text-violet11 outline-none dark:text-slate-400"
          id="urlInput"
          type="text"
          placeholder="Enter a URL to shorten..."
        />
        {errors.original && <span className="text-xs text-red-400">{errors.original.message}</span>}
        <button
          disabled={isSubmitting}
          type="submit"
          className="inline-flex h-6 items-center justify-center rounded bg-violet9 px-2.5 text-sm leading-none text-white outline-none hover:bg-violet10 focus:relative focus:shadow-[0_0_0_2px] focus:shadow-violet7"
        >
          Shorten
        </button>
      </form>

      <Table />
    </div>
  )
}
