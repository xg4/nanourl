import { Col, Input, List, Row, Typography } from 'antd'
import produce from 'immer'
import uniqBy from 'lodash/uniqBy'
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
    <div className="bg-gray-200">
      <div className="container mx-auto flex min-h-screen flex-col items-center justify-center">
        <h2 className="mb-10 text-lg font-bold text-gray-700">Nano URL</h2>
        <Input.Search
          placeholder="Enter a URL to shorten..."
          allowClear
          enterButton="Shorten"
          size="large"
          onSearch={(val) => val && mutate(val)}
          className="mb-10 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl"
          loading={isLoading}
        />
        <List
          className="w-full max-w-xs bg-white sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl"
          bordered
          header={
            <h3 className="mb-0 text-base font-medium">Shortened URLs</h3>
          }
          dataSource={list}
          renderItem={(item) => (
            <List.Item>
              <Row gutter={[10, 10]}>
                <Col className="text-right" span={6}>
                  Original URL:
                </Col>
                <Col span={18}>
                  <Typography.Text keyboard>{item.originalUrl}</Typography.Text>
                </Col>
                <Col className="text-right" span={6}>
                  Nano URL:
                </Col>
                <Col span={18}>
                  <Typography.Link
                    rel="noreferrer"
                    href={item.shortUrl}
                    target="_blank"
                    copyable
                  >
                    {item.shortUrl}
                  </Typography.Link>
                </Col>
              </Row>
            </List.Item>
          )}
        />
      </div>
    </div>
  )
}
