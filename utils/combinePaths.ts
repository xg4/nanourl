export default function combinePaths(...paths: string[]) {
  return paths.reduce((acc, cur) => (acc ? [acc.replace(/\/+$/, ''), cur.replace(/^\/+/, '')].join('/') : cur), '')
}
