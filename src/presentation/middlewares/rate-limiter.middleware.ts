import { Middleware } from '@application/protocols/http'
import { ErrorName, StatusCode } from '@common/enums'
import { ManyRequestsError } from '@common/errors'
import { RateLimitOptions, RateLimitProps } from '@common/interfaces'
import { Request, Response, NextFunction } from 'express'

export class RateLimiter implements Middleware {
  private requests: Map<string, RateLimitProps> = new Map()
  private options: RateLimitOptions

  constructor(options: RateLimitOptions) {
    this.options = options
  }

  public handle(req: Request, res: Response, next: NextFunction): void {
    const { windowMs, maxRequests } = this.options
    const clientIp = req.ip as string
    const currentTime = Date.now()
    const clientData = this.requests.get(clientIp)

    if (clientData) {
      if (currentTime - clientData.startTime < windowMs) {
        if (clientData.requestCount >= maxRequests) {
          res.status(StatusCode.TooManyRequests).json({
            status_code: StatusCode.TooManyRequests,
            name: ErrorName.TooManyRequests,
            message: ManyRequestsError()
          })
          return
        } else {
          clientData.requestCount += 1
        }
      } else {
        clientData.startTime = currentTime
        clientData.requestCount = 1
      }
    } else {
      this.requests.set(clientIp, { requestCount: 1, startTime: currentTime })
    }

    this.expiredRequestsClear(currentTime, windowMs)

    next()
  }

  private expiredRequestsClear(currentTime: number, windowMs: number): void {
    this.requests.forEach((data, ip) => {
      if (currentTime - data.startTime > windowMs) {
        this.requests.delete(ip)
      }
    })
  }
}
