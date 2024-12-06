import { HealthCheckStatus } from './heatlh-check-status.interface'

export interface HealthCheck extends HealthCheckStatus {
  api: HealthCheckStatus
  database: HealthCheckStatus
}
