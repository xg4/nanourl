import { GenerateUrl } from '@/types'
import { prefixShortCode } from '@/utils/path'
import QRCode from './QRCode'

export default function Table({ dataSource }: { dataSource: GenerateUrl[] }) {
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
          <tr key={item.originalUrl}>
            <td className="align-middle font-bold">{index + 1}</td>
            <td className="align-middle">
              <a rel="noreferrer" href={item.originalUrl} target="_blank">
                {item.originalUrl}
              </a>
            </td>
            <td className="align-middle">
              <a rel="noreferrer" href={item.shortUrl} target="_blank">
                {prefixShortCode(item.shortUrl)}
              </a>
            </td>
            <td className="hidden md:block">
              <QRCode className="m-0 h-20 w-20 object-contain" text={prefixShortCode(item.shortUrl)} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
