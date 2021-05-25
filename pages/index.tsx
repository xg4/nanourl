import clsx from 'clsx'
import { useState } from 'react'
import { toast } from '../components/Toast'

export default function Home() {
  const [link, setLink] = useState('')

  const [redirect, setRedirect] = useState('')

  const onSubmit = async () => {
    try {
      const res = await fetch('/api/link', {
        method: 'POST',
        body: JSON.stringify({ url: link }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const text = await res.text()
      if (res.ok) {
        setRedirect(location.origin + '/' + text)
        setLink('')
        toast.success('成功')
      } else {
        toast.fail(text)
      }
    } catch {
      toast.fail('失败')
    }
  }

  return (
    <div className="container mx-auto mt-40 mb-20 text-center px-10">
      <h2 className="text-lg font-bold mb-10 text-gray-700">Nano URL</h2>
      <div
        className={clsx('w-full inline-flex items-center justify-center', {
          'flex-col sm:flex-row': !!redirect,
        })}
      >
        {redirect ? (
          <>
            <a
              className="text-blue-500 px-2 hover:underline mb-10 sm:mb-0"
              href={redirect}
              target="_blank"
            >
              {redirect}
            </a>
            <button
              className="bg-indigo-600 hover:bg-indigo-500 focus:outline-none transition text-white px-8 py-3"
              onClick={() => {
                setRedirect('')
              }}
            >
              Shorten another URL
            </button>
          </>
        ) : (
          <>
            <input
              type="text"
              placeholder="Enter a URL to shorten..."
              className="max-w-sm flex-1 px-2 py-3 focus:outline-none focus:ring-1 focus:ring-indigo-300 focus:border-transparent"
              value={link}
              onChange={(evt) => {
                setLink(evt.target.value)
              }}
            />
            <button
              className="bg-indigo-600 hover:bg-indigo-500 focus:outline-none transition text-white px-8 py-3"
              onClick={onSubmit}
            >
              Shorten
            </button>
          </>
        )}
      </div>
    </div>
  )
}
