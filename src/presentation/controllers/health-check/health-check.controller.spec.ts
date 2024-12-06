import { Controller, ResponseHandler } from '@application/protocols/http'
import { ApplicationStatus } from '@common/enums'
import { HttpRequest, HttpResponse } from '@common/interfaces'
import { HealthCheck } from '@domain/interfaces/health-check'
import { HealthCheckUseCase } from '@domain/usecases/health-check'
import { HealthCheckController } from '@presentation/controllers/health-check'

describe('[Controllers] Health Check Controller', () => {
  it('should return the health check response', async () => {
    const healthCheckUC: HealthCheckUseCase = {
      execute: jest.fn().mockResolvedValue({
        status: ApplicationStatus.Up
      })
    }
    const healthCheckPresenter: ResponseHandler<HealthCheck> = {
      response: jest.fn().mockReturnValue({
        status: ApplicationStatus.Up
      })
    }
    const healthCheckController: Controller<HealthCheck> =
      new HealthCheckController(healthCheckUC, healthCheckPresenter)

    const request: HttpRequest = {
      params: {}
    }

    const response: HttpResponse<HealthCheck> =
      await healthCheckController.handle(request)

    expect(healthCheckUC.execute).toHaveBeenCalledTimes(1)
    expect(healthCheckPresenter.response).toHaveBeenCalledTimes(1)
    expect(response).toEqual({
      status: ApplicationStatus.Up
    })
  })

  it('should return the health check response with service unavailable status', async () => {
    const healthCheckUC: HealthCheckUseCase = {
      execute: jest.fn().mockResolvedValue({
        status: ApplicationStatus.Down
      })
    }
    const healthCheckPresenter: ResponseHandler<HealthCheck> = {
      response: jest.fn().mockReturnValue({
        status: ApplicationStatus.Down
      })
    }
    const healthCheckController: Controller<HealthCheck> =
      new HealthCheckController(healthCheckUC, healthCheckPresenter)

    const request: HttpRequest = {
      params: {}
    }

    const response: HttpResponse<HealthCheck> =
      await healthCheckController.handle(request)

    expect(healthCheckUC.execute).toHaveBeenCalledTimes(1)
    expect(healthCheckPresenter.response).toHaveBeenCalledTimes(1)
    expect(response).toEqual({
      status: ApplicationStatus.Down
    })
  })
})
