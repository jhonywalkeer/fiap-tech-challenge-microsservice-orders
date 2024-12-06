import { HealthCheckMap } from '@application/mappers'
import { HealthCheckUC } from '@application/usecases/health-check'
import { ApplicationStatus } from '@common/enums'
import { HealthCheck } from '@domain/interfaces/health-check'
import { DatabaseConnection } from '@infrastructure/persistence/database'
import { databaseConnectionMock } from '@mocks/database.mock'

describe('[Use Case] Health Check Use Case', () => {
  let apiStatus: string = ApplicationStatus.Up
  let databaseStatus: string = ApplicationStatus.Up

  let healthCheckUC: HealthCheckUC
  let databaseConnection: jest.Mocked<DatabaseConnection>

  beforeEach(() => {
    databaseConnection = databaseConnectionMock
    healthCheckUC = new HealthCheckUC(databaseConnection)
  })

  it('should return the correct health check object case up', async () => {
    databaseConnection.isConnected.mockResolvedValue(true)

    const healthCheck: HealthCheck = await healthCheckUC.execute()
    const result: HealthCheck = HealthCheckMap.execute(
      apiStatus,
      databaseStatus
    )
    expect(healthCheck).toEqual(result)
  })

  it('should return the correct health check object case down', async () => {
    databaseConnection.isConnected.mockResolvedValue(false)

    const healthCheck: HealthCheck = await healthCheckUC.execute()
    apiStatus = ApplicationStatus.Down
    databaseStatus = ApplicationStatus.Down

    const result: HealthCheck = HealthCheckMap.execute(
      apiStatus,
      databaseStatus
    )

    expect(healthCheck).toEqual(result)
  })
})
