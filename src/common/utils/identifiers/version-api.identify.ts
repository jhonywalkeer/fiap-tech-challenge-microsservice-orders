import * as fs from 'fs'
import * as path from 'path'

export const VersionApiIdentify = (): string => {
  const packageJson = fs.readFileSync(
    path.resolve(__dirname, '../../../../package.json'),
    'utf-8'
  )
  const { version } = JSON.parse(packageJson)

  return version.split('.').shift()
}
