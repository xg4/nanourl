type UrlString = string | number | boolean

export default function combinePaths(...paths: UrlString[]) {
  return paths
    .map(String)
    .reduce((acc, cur) => (acc ? [acc.replace(/\/+$/, ''), cur.replace(/^\/+/, '')].join('/') : cur), '')
}

export function prefixUrl(...pathnames: UrlString[]) {
  return (...paths: UrlString[]) => combinePaths(...pathnames, ...paths)
}

export const prefixShortCode = prefixUrl(typeof window !== 'undefined' ? window.location.origin : '')
