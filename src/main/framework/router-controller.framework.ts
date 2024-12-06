import { ServerConfig } from '@common/constants'
import { Logger } from '@common/utils/loggers'
import { SwaggerDocumention } from '@main/framework'
import { HealthCheckRoute, OrdersRoute } from '@main/routes'
import { Application } from 'express'
import { serve, setup } from 'swagger-ui-express'

export const RouterFramework = (app: Application): void => {
  const routes = [
    {
      path: `${ServerConfig.ApiVersion}/health`,
      handler: HealthCheckRoute
    },
    { path: `${ServerConfig.ApiVersion}/products`, handler: OrdersRoute }
  ]

  routes.forEach((route) => {
    app.use(route.path, route.handler)
    app.use(
      `${ServerConfig.ApiVersion}${ServerConfig.DocumentationRoute}`,
      serve,
      setup(SwaggerDocumention)
    )
    Logger.info(`Rota ${route.path} registrada com sucesso!`)
  })
}
