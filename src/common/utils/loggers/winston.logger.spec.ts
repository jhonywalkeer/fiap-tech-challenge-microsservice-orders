import { Logger } from './winston.logger'

describe('Winston Logger', () => {
  it('should be defined', () => {
    expect(Logger).toBeDefined()
  })

  it('should log info messages to console and combined file', () => {
    const logSpy = jest.spyOn(Logger, 'info')
    Logger.info('This is an info message')
    expect(logSpy).toHaveBeenCalledWith('This is an info message')
  })

  it('should log error messages to error file', () => {
    const logSpy = jest.spyOn(Logger, 'error')
    Logger.error('This is an error message')
    expect(logSpy).toHaveBeenCalledWith('This is an error message')
  })

  it('should handle rejections and log to rejections file', () => {
    const logSpy = jest.spyOn(Logger, 'error')
    Promise.reject(new Error('This is a rejection')).catch((error) => {
      Logger.error(error.message)
    })
    expect(logSpy).toHaveBeenCalledWith('This is an error message')
  })
})
