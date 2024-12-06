import { ExpressRouteAdapter } from '@main/adapters/framework'
import { HealthCheckControllerFactory } from '@main/factories/health-check'
import { Router } from 'express'

export const HealthCheckRoute = Router()

const { healthCheckController } = HealthCheckControllerFactory()

HealthCheckRoute.get('/', ExpressRouteAdapter(healthCheckController))
