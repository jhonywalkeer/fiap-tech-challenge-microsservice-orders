import { StatusApplicationIdentify } from '@common/utils/identifiers'
import { HealthCheck } from '@domain/interfaces/health-check'

export class HealthCheckMap {
  static execute(apiStatus: string, databaseStatus: string): HealthCheck {
    return {
      status: StatusApplicationIdentify(apiStatus, databaseStatus),
      api: {
        status: StatusApplicationIdentify(apiStatus, databaseStatus)
      },
      database: {
        status: databaseStatus
      }
    }
  }
}
