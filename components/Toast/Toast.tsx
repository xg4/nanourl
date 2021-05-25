import clsx from 'clsx'
import React, { useEffect, useState } from 'react'

interface ToastProps {
  content: React.ReactNode
  type: string
  duration: number
  onUnmount?: () => void
}

function renderIcon(type: string) {
  switch (type) {
    case 'success':
      return (
        <svg
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 fill-current stroke-current text-green-500"
        >
          <path d="M878.08 731.274667a32 32 0 0 1-54.88-32.938667A360.789333 360.789333 0 0 0 874.666667 512c0-200.298667-162.368-362.666667-362.666667-362.666667S149.333333 311.701333 149.333333 512s162.368 362.666667 362.666667 362.666667a360.789333 360.789333 0 0 0 186.314667-51.445334 32 32 0 0 1 32.928 54.88A424.778667 424.778667 0 0 1 512 938.666667C276.362667 938.666667 85.333333 747.637333 85.333333 512S276.362667 85.333333 512 85.333333s426.666667 191.029333 426.666667 426.666667c0 78.293333-21.152 153.568-60.586667 219.274667zM374.581333 489.450667l84.341334 83.989333 190.432-190.72a32 32 0 0 1 45.290666 45.226667l-213.013333 213.333333a32 32 0 0 1-45.226667 0.064l-106.986666-106.549333a32 32 0 1 1 45.162666-45.344z"></path>
        </svg>
      )
    case 'error':
      return (
        <svg
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          className="text-red-500 w-5 h-5 fill-current"
        >
          <path d="M878.08 731.274667a32 32 0 0 1-54.88-32.938667A360.789333 360.789333 0 0 0 874.666667 512c0-200.298667-162.368-362.666667-362.666667-362.666667S149.333333 311.701333 149.333333 512s162.368 362.666667 362.666667 362.666667a360.789333 360.789333 0 0 0 186.314667-51.445334 32 32 0 0 1 32.928 54.88A424.778667 424.778667 0 0 1 512 938.666667C276.362667 938.666667 85.333333 747.637333 85.333333 512S276.362667 85.333333 512 85.333333s426.666667 191.029333 426.666667 426.666667c0 78.293333-21.152 153.568-60.586667 219.274667zM555.232 512l86.474667 86.474667a30.570667 30.570667 0 1 1-43.232 43.232L512 555.232l-86.474667 86.474667a30.570667 30.570667 0 1 1-43.232-43.232L468.768 512l-86.474667-86.474667a30.570667 30.570667 0 1 1 43.232-43.232L512 468.768l86.474667-86.474667a30.570667 30.570667 0 1 1 43.232 43.232L555.232 512z"></path>
        </svg>
      )
    case 'loading':
      return (
        <svg
          className="loading stroke-current text-indigo-500 w-5 h-5"
          viewBox="25 25 50 50"
        >
          <circle cx="50" cy="50" r="20"></circle>
        </svg>
      )
    default:
      return null
  }
}

export const Toast: React.FC<ToastProps> = (props) => {
  const { content, type, duration, onUnmount } = props
  const [show, setShow] = useState(false)

  useEffect(() => {
    setShow(true)

    if (duration !== -1) {
      setTimeout(() => {
        setShow(false)
      }, duration)

      setTimeout(() => {
        if (onUnmount) {
          onUnmount()
        }
      }, duration + 300)
    }
  }, [])

  function handleClick() {
    if (onUnmount) {
      onUnmount()
    }
  }

  return (
    <div
      className={clsx(
        'flex items-center justify-center',
        'fixed top-10 left-0 right-0 z-50',
        show ? 'backInDown' : 'backOutUp'
      )}
      data-type={type}
      role="alert"
    >
      <div
        className="flex items-center my-0 mx-5 px-5 py-2 rounded-3xl bg-white shadow"
        role="presentation"
        onClick={handleClick}
      >
        <span className="mr-2">{renderIcon(type)}</span>
        <p className="flex-auto text-sm">{content}</p>
      </div>
    </div>
  )
}
