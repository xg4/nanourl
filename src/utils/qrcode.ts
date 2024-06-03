import QRCode, { QRCodeRenderersOptions } from 'qrcode'

export async function create(text: string, options?: QRCodeRenderersOptions): Promise<Blob> {
  return new Promise((resolve, reject) =>
    QRCode.toCanvas(text, options)
      .then(c =>
        c.toBlob(blob => {
          if (!blob) {
            throw new Error("Can't create qr code")
          }
          resolve(blob)
        }),
      )
      .catch(reject),
  )
}
