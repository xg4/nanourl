import { isObject } from 'lodash'

async function post<T>(input: RequestInfo | URL, data: any): Promise<T> {
  const result = await fetch(input, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  const jsonData = await result.json()
  if (!result.ok) {
    if (typeof jsonData === 'string') {
      throw new Error(jsonData)
    }
    if (isObject(jsonData)) {
      const error = Object.values(jsonData)[0]
      throw new Error(error)
    }
    return Promise.reject(jsonData)
  }
  return jsonData
}

export function createUrl(data: { url: string; shortCode?: string }): Promise<string> {
  return post('/url', data)
}
