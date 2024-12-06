import { ApplicationStatus } from '@common/enums'

import { StatusApplicationIdentify } from './status-application.identify'

describe('[Identifiers] Status Application Identify', () => {
  it('should return Up if both api and database are up', () => {
    const apiStatus: string = ApplicationStatus.Up
    const databaseStatus: string = ApplicationStatus.Up
    const expectedOutput: string = ApplicationStatus.Up
    const result: string = StatusApplicationIdentify(apiStatus, databaseStatus)

    expect(result).toEqual(expectedOutput)
  })

  it('should return Down if database is down', () => {
    const apiStatus: string = ApplicationStatus.Up
    const databaseStatus: string = ApplicationStatus.Down
    const expectedOutput: string = ApplicationStatus.Down
    const result: string = StatusApplicationIdentify(apiStatus, databaseStatus)

    expect(result).toEqual(expectedOutput)
  })

  it('should return Down if both api and database are down', () => {
    const apiStatus: string = ApplicationStatus.Down
    const databaseStatus: string = ApplicationStatus.Down
    const expectedOutput: string = ApplicationStatus.Down
    const result: string = StatusApplicationIdentify(apiStatus, databaseStatus)

    expect(result).toEqual(expectedOutput)
  })
})
