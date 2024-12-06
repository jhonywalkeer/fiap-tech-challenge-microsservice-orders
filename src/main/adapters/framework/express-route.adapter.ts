import { Controller } from '@application/protocols/http'
import { StatusCode, ApiMethod } from '@common/enums'
import { HttpException } from '@common/utils/exceptions'
import { NextFunction, Request, Response } from 'express'

export const ExpressRouteAdapter = <T>(controller: Controller<T>) => {
  return async (request: Request, response: Response, next: NextFunction) => {
    return Promise.resolve(
      controller.handle({
        query: request.query,
        params: request.params,
        body: request.body,
        headers: request.headers
      })
    )
      .then((controllerResponse) => {
        if (
          request.method === ApiMethod.Get &&
          request.query.page &&
          request.query.limit
        ) {
          response
            .status(controllerResponse.statusCode)
            .json(controllerResponse.body)
        } else if (controllerResponse.statusCode === StatusCode.Accepted) {
          response.status(controllerResponse.statusCode).send()
        } else {
          response
            .status(controllerResponse.statusCode)
            .json({ data: controllerResponse.body })
        }
        return next()
      })
      .catch((error) => {
        if (error instanceof HttpException) {
          response.status(error.statusCode).json({
            status_code: error.statusCode,
            name: error.name,
            message: error.message
          })
        }
      })
  }
}
