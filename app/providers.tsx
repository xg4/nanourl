'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ConfigProvider } from 'antd'
import 'dayjs/locale/zh-cn'
import { noop } from 'lodash'
import { PropsWithChildren, useState } from 'react'

export default function Providers({ children }: PropsWithChildren) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: false,
          },
        },
        logger: {
          error: noop,
          warn: noop,
          log: noop,
        },
      }),
  )
  return (
    <ConfigProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </ConfigProvider>
  )
}
