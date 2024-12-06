import { HealthCheckMap } from '@application/mappers'
import { ApplicationStatus } from '@common/enums'
import { StatusApplicationIdentify } from '@common/utils/identifiers'
import { HealthCheck } from '@domain/interfaces/health-check'

describe('[Mappers] Health Check Map', () => {
  it('should return the correct health check object', () => {
    const apiStatus: string = ApplicationStatus.Up
    const databaseStatus: string = ApplicationStatus.Up
    const healthCheck: HealthCheck = HealthCheckMap.execute(
      apiStatus,
      databaseStatus
    )

    expect(healthCheck).toEqual({
      status: StatusApplicationIdentify(apiStatus, databaseStatus),
      api: {
        status: StatusApplicationIdentify(apiStatus, databaseStatus)
      },
      database: {
        status: databaseStatus
      }
    })
  })
})
