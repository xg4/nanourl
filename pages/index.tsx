import { Input, List, Typography } from 'antd'
import produce from 'immer'
import { uniqBy } from 'lodash'
import { useState } from 'react'
import { useMutation } from 'react-query'
import { shortUrl } from '../services'

interface GenerateUrl {
  originalUrl: string
  shortUrl: string
}

export default function Home() {
  const [_list, setList] = useState<GenerateUrl[]>([])
  const list = uniqBy(_list, 'originalUrl')

  const { mutate, isLoading } = useMutation(shortUrl, {
    onSuccess(result, val) {
      const shortUrl = location.origin + '/' + result
      const originalUrl = val
      setList(
        produce((draft) => {
          draft.push({
            originalUrl,
            shortUrl,
          })
        })
      )
    },
  })

  return (
    <div className="container mx-auto mt-40 mb-20 px-10 text-center">
      <h2 className="mb-10 text-lg font-bold text-gray-700">Nano URL</h2>
      <Input.Search
        placeholder="Enter a URL to shorten..."
        allowClear
        enterButton="Shorten"
        size="large"
        onSearch={(val) => val && mutate(val)}
        className="mb-10 max-w-lg"
        loading={isLoading}
      />
      <List
        className="bg-white"
        bordered
        header={'shortened URLs'}
        dataSource={list}
        renderItem={(item) => (
          <List.Item>
            <Typography.Text keyboard>{item.originalUrl}</Typography.Text>
            <span>-</span>
            <Typography.Link
              rel="noreferrer"
              href={item.shortUrl}
              target="_blank"
              copyable
            >
              {item.shortUrl}
            </Typography.Link>
          </List.Item>
        )}
      />
    </div>
  )
}
