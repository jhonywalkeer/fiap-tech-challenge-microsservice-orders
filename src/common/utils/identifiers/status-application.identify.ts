import { ApplicationStatus } from '@common/enums'

export const StatusApplicationIdentify = (
  apiStatus: string,
  databaseStatus: string
): string => {
  return apiStatus && databaseStatus === ApplicationStatus.Up
    ? ApplicationStatus.Up
    : ApplicationStatus.Down
}
