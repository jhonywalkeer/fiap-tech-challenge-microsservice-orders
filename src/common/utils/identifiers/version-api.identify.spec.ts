import { VersionApiIdentify } from '@common/utils/identifiers'
import * as fs from 'fs'
import * as path from 'path'

jest.mock('fs')
jest.mock('path')

describe('VersionApiIdentify', () => {
  const mockReadFileSync = fs.readFileSync as jest.Mock
  const mockResolve = path.resolve as jest.Mock

  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('should return the major version from package.json', () => {
    const mockVersion = '1.2.3'
    const mockPackageJson = JSON.stringify({ version: mockVersion })

    mockReadFileSync.mockReturnValue(mockPackageJson)
    mockResolve.mockReturnValue('/mocked/path/to/package.json')

    const result = VersionApiIdentify()

    expect(mockResolve).toHaveBeenCalledWith(
      __dirname,
      '../../../../package.json'
    )
    expect(mockReadFileSync).toHaveBeenCalledWith(
      '/mocked/path/to/package.json',
      'utf-8'
    )
    expect(result).toBe('1')
  })

  it('should handle invalid JSON in package.json', () => {
    mockReadFileSync.mockReturnValue('invalid json')
    mockResolve.mockReturnValue('/mocked/path/to/package.json')

    expect(() => VersionApiIdentify()).toThrow(SyntaxError)
  })

  it('should handle missing version in package.json', () => {
    const mockPackageJson = JSON.stringify({})
    mockReadFileSync.mockReturnValue(mockPackageJson)
    mockResolve.mockReturnValue('/mocked/path/to/package.json')

    expect(() => VersionApiIdentify()).toThrow(TypeError)
  })
})
