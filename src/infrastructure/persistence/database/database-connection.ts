import { PrismaClient } from '@prisma/client'

export class DatabaseConnection extends PrismaClient {
  constructor() {
    super()
  }

  async connect() {
    await this.$connect()
  }

  async disconnect() {
    await this.$disconnect()
  }

  async isConnected(): Promise<boolean> {
    try {
      await this.$queryRaw`SELECT 1`
      return true
    } catch (error) {
      console.error(error)
      return false
    }
  }
}
