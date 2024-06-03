import ky from 'ky'

export const request = ky.create({
  timeout: 30 * 1e3,
})
