import { ServerConfig } from '@common/constants'
import { Logger } from '@common/utils/loggers'
import { RouterFramework } from '@main/framework'
import { HealthCheckRoute, OrdersRoute } from '@main/routes'
import { Application } from 'express'

describe('[Framework] Router Framework', () => {
  let app: Application

  beforeEach(() => {
    app = {
      use: jest.fn()
    } as unknown as Application

    jest.spyOn(Logger, 'info').mockImplementation(jest.fn())
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should register routes correctly', () => {
    RouterFramework(app)

    expect(app.use).toHaveBeenCalledWith(
      `${ServerConfig.ApiVersion}/health`,
      HealthCheckRoute
    )
    expect(app.use).toHaveBeenCalledWith(
      `${ServerConfig.ApiVersion}/orders`,
      OrdersRoute
    )
  })

  it('should log route registration', () => {
    RouterFramework(app)

    expect(Logger.info).toHaveBeenCalledWith(
      'Rota /api/v1/health registrada com sucesso!'
    )
    expect(Logger.info).toHaveBeenCalledWith(
      'Rota /api/v1/orders registrada com sucesso!'
    )
  })
})
