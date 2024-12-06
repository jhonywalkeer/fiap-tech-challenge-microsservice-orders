import { ExpressRouteAdapter } from '@main/adapters/framework'
import { HealthCheckControllerFactory } from '@main/factories/health-check'
import { HealthCheckRoute } from '@main/routes/health-check.route'
import { Router } from 'express'

describe('[Routes] Health Check Route', () => {
  it('should be defined', () => {
    expect(HealthCheckRoute).toBeDefined()
  })

  it('should be able to call the route', () => {
    const route = Router()
    const { healthCheckController } = HealthCheckControllerFactory()

    HealthCheckRoute.get('/', ExpressRouteAdapter(healthCheckController))

    expect(route).toBeDefined()
  })
})
