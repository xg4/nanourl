import { isString } from 'lodash'
import { useState } from 'react'
import { toast } from '../components/Toast'
import { request } from '../util/request'

export default function Home() {
  const [link, setLink] = useState('')

  const [redirect, setRedirect] = useState('')

  return (
    <div className="container mx-auto mt-40 mb-20 px-10 text-center">
      <h2 className="mb-10 text-lg font-bold text-gray-700">Nano URL</h2>
      {redirect ? (
        <div className="inline-flex w-full flex-col items-center justify-center sm:flex-row">
          <a
            rel="noreferrer"
            className="mb-10 px-2 text-blue-500 hover:underline sm:mb-0"
            href={redirect}
            target="_blank"
          >
            {redirect}
          </a>
          <button
            className="bg-indigo-600 px-8 py-3 text-white transition hover:bg-indigo-500 focus:outline-none"
            onClick={() => {
              setRedirect('')
            }}
          >
            Shorten another URL
          </button>
        </div>
      ) : (
        <form
          className="inline-flex w-full items-center justify-center"
          onSubmit={async (evt) => {
            evt.preventDefault()
            if (!link) {
              return
            }
            try {
              const result = await request.post('/api/link', {
                url: link,
              })

              setRedirect(location.origin + '/' + result)
              setLink('')
              toast.success('成功')
            } catch (err) {
              if (isString(err)) {
                toast.fail(err)
              }
            }
          }}
        >
          <input
            type="text"
            placeholder="Enter a URL to shorten..."
            className="max-w-sm flex-1 px-2 py-3 focus:border-transparent focus:outline-none focus:ring-1 focus:ring-indigo-300"
            value={link}
            onChange={(evt) => {
              setLink(evt.target.value)
            }}
          />
          <button
            type="submit"
            className="bg-indigo-600 px-8 py-3 text-white transition hover:bg-indigo-500 focus:outline-none"
          >
            Shorten
          </button>
        </form>
      )}
    </div>
  )
}
