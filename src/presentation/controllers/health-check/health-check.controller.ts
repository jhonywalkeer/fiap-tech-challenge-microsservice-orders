import { Controller, ResponseHandler } from '@application/protocols/http'
import { ApplicationStatus, StatusCode } from '@common/enums'
import { HttpRequest } from '@common/interfaces'
import { Logger } from '@common/utils/loggers'
import { HealthCheck } from '@domain/interfaces/health-check'
import { HealthCheckUseCase } from '@domain/usecases/health-check'

export class HealthCheckController implements Controller<HealthCheck> {
  constructor(
    private readonly healthCheckUC: HealthCheckUseCase,
    private readonly healthCheckPresenter: ResponseHandler<HealthCheck>
  ) {}
  async handle(request: HttpRequest) {
    Logger.info('[HealthCheckController.handle]', request.params)

    const healthCheck: HealthCheck = await this.healthCheckUC.execute()
    return this.healthCheckPresenter.response(
      healthCheck,
      healthCheck.status === ApplicationStatus.Up
        ? StatusCode.Sucess
        : StatusCode.ServiceUnavailable
    )
  }
}
