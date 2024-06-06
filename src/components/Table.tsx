'use client'

import { URL_STORAGE_KEY } from '@/constants'
import { Url } from '@prisma/client'
import { useLocalStorage } from 'usehooks-ts'
import QRCode from './QRCode'

function compose(short: string) {
  return [window.location.origin, short].join('/')
}

export default function Table() {
  const [dataSource] = useLocalStorage<Url[]>(URL_STORAGE_KEY, [])

  if (!dataSource.length) {
    return null
  }

  return (
    <table className="table-auto break-all">
      <thead>
        <tr>
          <th>#</th>
          <th>Original URL</th>
          <th>Nano URL</th>
          <th className="hidden md:block">QR Code</th>
        </tr>
      </thead>
      <tbody>
        {dataSource.map((item, index) => (
          <tr key={item.id}>
            <td className="align-middle font-bold">{index + 1}</td>
            <td className="align-middle">
              <a rel="noreferrer" href={item.original} target="_blank">
                {item.original}
              </a>
            </td>
            <td className="align-middle">
              <a rel="noreferrer" href={item.short} target="_blank">
                {compose(item.short)}
              </a>
            </td>
            <td className="hidden md:block">
              <QRCode className="m-0 h-20 w-20 object-contain" text={compose(item.short)} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
