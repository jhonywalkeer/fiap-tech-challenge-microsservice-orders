import { DatabaseConnection } from '@infrastructure/persistence/database'

export const databaseConnectionMock = {
  isConnected: jest.fn()
} as unknown as jest.Mocked<DatabaseConnection>
