import { Request, Response, NextFunction } from 'express'

export interface Middleware {
  handle(req: Request, res: Response, next: NextFunction): void
}
