import { create } from '@/utils/qrcode'
import { QRCodeRenderersOptions } from 'qrcode'
import { ImgHTMLAttributes, Ref, forwardRef, useEffect, useState } from 'react'

export interface QRCodeProps extends ImgHTMLAttributes<HTMLImageElement> {
  text: string
  options?: QRCodeRenderersOptions
}

const QRCode = forwardRef(({ text, options, ...restProps }: Omit<QRCodeProps, 'src'>, ref: Ref<HTMLImageElement>) => {
  const [url, setUrl] = useState('')
  const [blob, setBlob] = useState<Blob>()

  useEffect(() => {
    create(text, options).then(setBlob)
  }, [text, options])

  useEffect(() => {
    if (!blob) {
      return
    }
    const url = URL.createObjectURL(blob)
    setUrl(url)
    return () => {
      URL.revokeObjectURL(url)
    }
  }, [blob])

  return <img {...restProps} ref={ref} src={url} />
})

QRCode.displayName = 'QRCode'

export default QRCode
