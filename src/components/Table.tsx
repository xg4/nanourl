'use client'

import { URL_STORAGE_KEY } from '@/constants'
import { Url } from '@prisma/client'
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import classnames from 'classnames'
import { useLocalStorage } from 'usehooks-ts'
import QRCode from './QRCode'

function compose(short: string) {
  return [window.location.origin, short].join('/')
}

function Link({ href }: { href: string }) {
  return (
    <a
      className="inline-block max-w-32 truncate break-keep md:max-w-40 lg:max-w-52 xl:max-w-60"
      rel="noreferrer"
      href={href}
      target="_blank"
    >
      {href}
    </a>
  )
}

const columnHelper = createColumnHelper<Url>()

const columns = [
  columnHelper.accessor('id', {
    header: '#',
    cell(info) {
      return info.row.index + 1
    },
  }),

  columnHelper.accessor('original', {
    header: 'Original URL',
    cell(info) {
      return <Link href={info.getValue()} />
    },
  }),
  columnHelper.accessor('short', {
    header: 'Nano URL',
    cell(info) {
      return <Link href={compose(info.getValue())} />
    },
  }),
  columnHelper.accessor(row => row.short, {
    header: 'QR Code',
    cell(info) {
      return <QRCode className="m-0 inline-block h-20 w-20 object-contain" text={compose(info.getValue())} />
    },
  }),
]

export default function Table() {
  const [data] = useLocalStorage<Url[]>(URL_STORAGE_KEY, [])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  if (!data.length) {
    return null
  }

  return (
    <table className="table-auto">
      <thead>
        {table.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map(header => (
              <th
                key={header.id}
                colSpan={header.colSpan}
                className={classnames({
                  'hidden md:block': header.column.getIsLastColumn(),
                })}
              >
                {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map(row => (
          <tr key={row.id}>
            {row.getVisibleCells().map(cell => (
              <td
                key={cell.id}
                className={classnames('text-center align-middle', {
                  'font-bold': cell.column.getIsFirstColumn(),
                  'hidden md:block': cell.column.getIsLastColumn(),
                })}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
      <tfoot>
        {table.getFooterGroups().map(footerGroup => (
          <tr key={footerGroup.id}>
            {footerGroup.headers.map(header => (
              <th key={header.id}>
                {header.isPlaceholder ? null : flexRender(header.column.columnDef.footer, header.getContext())}
              </th>
            ))}
          </tr>
        ))}
      </tfoot>
    </table>
  )
}
