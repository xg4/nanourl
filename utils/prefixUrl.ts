import combinePaths from './combinePaths'

export default function prefixUrl(...pathnames: string[]) {
  return (...paths: string[]) => combinePaths(...pathnames, ...paths)
}

export const prefixShortCode = prefixUrl(typeof window !== 'undefined' ? window.location.origin : '')
