import { SwaggerDummy } from '@dummies/swagger'
import { SwaggerDocumention } from '@main/framework'

jest.mock('@docs/swagger/swagger.json', () => SwaggerDummy)

describe('[Framework] Swagger Documention', () => {
  it('should load the swagger documentation', () => {
    expect(SwaggerDocumention).toEqual(SwaggerDummy)
  })

  it('should have the correct API version', () => {
    expect(SwaggerDocumention.openapi).toBe('3.0.0')
  })

  it('should have the correct API title', () => {
    expect(SwaggerDocumention.info.title).toBe('Test API')
  })

  it('should have the correct API version', () => {
    expect(SwaggerDocumention.info.version).toBe('1.0.0')
  })

  it('should have paths defined', () => {
    expect(SwaggerDocumention.paths).toEqual({})
  })
})
