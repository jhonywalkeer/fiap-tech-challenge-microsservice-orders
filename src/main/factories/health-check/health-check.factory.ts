import { HealthCheckUC } from '@application/usecases/health-check'
import { HealthCheck } from '@domain/interfaces/health-check'
import { DatabaseConnection } from '@infrastructure/persistence/database'
import { HealthCheckController } from '@presentation/controllers/health-check'
import { HttpGenericResponse } from '@presentation/helpers'

export const HealthCheckControllerFactory = () => {
  const databaseConnection = new DatabaseConnection()
  const healthCheckUseCase = new HealthCheckUC(databaseConnection)
  const genericSucessPresenter = new HttpGenericResponse<HealthCheck>()
  const healthCheckController = new HealthCheckController(
    healthCheckUseCase,
    genericSucessPresenter
  )

  return {
    databaseConnection,
    healthCheckUseCase,
    healthCheckController
  }
}
