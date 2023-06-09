'use client'

import { prefixShortCode } from '@/utils/prefixUrl'
import { zodResolver } from '@hookform/resolvers/zod'
import { uniqBy } from 'lodash'
import { useCallback, useLayoutEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { z } from 'zod'
import { createUrl } from '../services'

interface GenerateUrl {
  originalUrl: string
  shortUrl: string
}

const formSchema = z.object({
  url: z.string().url('Invalid url'),
})

type FormSchemaType = z.infer<typeof formSchema>

export default function Home() {
  const [list, setList] = useState<GenerateUrl[]>([])
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
  })

  const onSubmit: SubmitHandler<FormSchemaType> = useCallback(
    async data => {
      try {
        const shortCode = await createUrl(data)
        setList(prev =>
          uniqBy(
            [
              ...prev,
              {
                originalUrl: data.url,
                shortUrl: shortCode,
              },
            ],
            'originalUrl',
          ),
        )
      } catch (err) {
        if (err instanceof Error) {
          toast.error(err.message)
        }
      }
      reset()
    },
    [reset],
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

function Table({ dataSource }: { dataSource: GenerateUrl[] }) {
  return (
    <table className="table-auto break-all">
      <thead>
        <tr>
          <th>#</th>
          <th>Original URL</th>
          <th>Nano URL</th>
        </tr>
      </thead>
      <tbody>
        {dataSource.map((item, index) => (
          <tr key={item.originalUrl}>
            <td>{index + 1}</td>
            <td>
              <a rel="noreferrer" href={item.originalUrl} target="_blank">
                {item.originalUrl}
              </a>
            </td>
            <td>
              <a rel="noreferrer" href={item.shortUrl} target="_blank">
                {prefixShortCode(item.shortUrl)}
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
