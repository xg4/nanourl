import { useMutation } from '@tanstack/react-query'
import { Button, Col, Form, Input, List, Row, Typography } from 'antd'
import { produce } from 'immer'
import uniqBy from 'lodash/uniqBy'
import { useEffect, useState } from 'react'
import { createUrl } from '../services'

interface GenerateUrl {
  originalUrl: string
  shortUrl: string
}

export default function Home() {
  const [form] = Form.useForm()
  const [_list, setList] = useState<GenerateUrl[]>([])
  const list = uniqBy(_list, 'originalUrl')

  const { mutate, isLoading } = useMutation(createUrl, {
    onSuccess(result, val) {
      const shortUrl = location.origin + '/' + result
      const originalUrl = val.url
      form.resetFields()
      setList(
        produce(draft => {
          draft.push({
            originalUrl,
            shortUrl,
          })
        }),
      )
    },
  })

  const [prefixUrl, setPrefixUrl] = useState('')
  useEffect(() => {
    window.location.origin && setPrefixUrl(window.location.origin + '/')
  }, [])

  const onFinish = (values: { url: string; shortCode: string }) => {
    if (isLoading) {
      return
    }
    mutate(values)
  }
  return (
    <div className="bg-gray-200">
      <div className="container mx-auto flex min-h-screen flex-col items-center justify-center sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
        <h2 className="mb-10 text-lg font-bold text-gray-700">Nano URL</h2>
        <Form form={form} className="mb-10 w-full rounded-xl bg-white p-10 shadow-lg" onFinish={onFinish}>
          <Form.Item label="Original URL" name="url" rules={[{ required: true, message: 'Please input your URL!' }]}>
            <Input placeholder="Enter a URL to shorten..." allowClear />
          </Form.Item>
          <Form.Item
            label="Short Code"
            name="shortCode"
            rules={[{ required: true, message: 'Please input your shorten code!' }]}
          >
            <Input addonBefore={prefixUrl} placeholder="Input shorten code" allowClear />
          </Form.Item>

          <Form.Item className="flex justify-center">
            <Button type="primary" htmlType="submit">
              Shorten
            </Button>
          </Form.Item>
        </Form>
        <List
          className="w-full bg-white"
          bordered
          header={<h3 className="mb-0 text-base font-medium">Shortened URLs</h3>}
          dataSource={list}
          renderItem={item => (
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
                  <Typography.Link rel="noreferrer" href={item.shortUrl} target="_blank" copyable>
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
