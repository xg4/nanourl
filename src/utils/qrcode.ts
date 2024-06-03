import QRCode, { QRCodeRenderersOptions } from 'qrcode'

export async function create(text: string, options?: QRCodeRenderersOptions): Promise<Blob> {
  return new Promise((resolve, reject) =>
    QRCode.toCanvas(text, options)
      .then(c =>
        c.toBlob(blob => {
          if (!blob) {
            throw new Error("Can't create QR Code")
          }
          resolve(blob)
        }),
      )
      .catch(reject),
  )
}
