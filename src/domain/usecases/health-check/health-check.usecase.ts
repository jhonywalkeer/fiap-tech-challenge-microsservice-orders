import { HealthCheck } from '@domain/interfaces/health-check'

export interface HealthCheckUseCase {
  execute(): Promise<HealthCheck>
}
