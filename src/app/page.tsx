'use client'

import Table from '@/components/Table'
import { createUrl } from '@/services'
import { CreateUrlType, GenerateUrl } from '@/types'
import { toastError } from '@/utils/error'
import { createUrlSchema } from '@/utils/validate'
import { zodResolver } from '@hookform/resolvers/zod'
import { uniqBy } from 'lodash'
import { useCallback, useLayoutEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

export default function Home() {
  const [list, setList] = useState<GenerateUrl[]>([])

  const append = useCallback((data: GenerateUrl) => {
    setList(prev => uniqBy([...prev, data], 'originalUrl'))
  }, [])

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateUrlType>({
    resolver: zodResolver(createUrlSchema),
  })

  const onSubmit: SubmitHandler<CreateUrlType> = useCallback(
    data => {
      createUrl(data)
        .then(shortUrl =>
          append({
            originalUrl: data.url,
            shortUrl,
          }),
        )
        .catch(toastError)
        .finally(reset)
    },
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
          {...register('url')}
          className="h-9 flex-1 bg-transparent px-2.5 text-base leading-none text-violet11 outline-none dark:text-slate-400"
          id="urlInput"
          type="text"
          placeholder="Enter a URL to shorten..."
        />
        {errors.url && <span className="text-xs text-red-400">{errors.url.message}</span>}
        <button
          disabled={isSubmitting}
          type="submit"
          className="inline-flex h-6 items-center justify-center rounded bg-violet9 px-2.5 text-sm leading-none text-white outline-none hover:bg-violet10 focus:relative focus:shadow-[0_0_0_2px] focus:shadow-violet7"
        >
          Shorten
        </button>
      </form>

      {list.length ? <Table dataSource={list} /> : null}
    </div>
  )
}
