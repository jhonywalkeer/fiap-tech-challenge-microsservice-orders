import { ServerConfig } from '@common/constants'
import { VersionApiIdentify } from '@common/utils/identifiers'
import { Logger } from '@common/utils/loggers'
import { DatabaseConnection } from '@infrastructure/persistence/database'
import { RouterFramework } from '@main/framework'
import { RateLimiter } from '@presentation/middlewares'
import cors from 'cors'
import express, { Express } from 'express'

export const SetupFramework = async (): Promise<void> => {
  const port: number = process.env.PORT
    ? parseInt(process.env.PORT)
    : ServerConfig.Port
  const host: string = ServerConfig.Host
  const baseUrl: string = `${process.env.HOST}:${port}`
  const framework: Express = express()
  const db: DatabaseConnection = new DatabaseConnection()
  const isDbConnected: boolean = await db.isConnected()
  const rateLimiter: RateLimiter = new RateLimiter(ServerConfig.RateLimitConfig)
  const documentation: string = `${baseUrl}${ServerConfig.ApiVersion}${ServerConfig.DocumentationRoute}`

  if (!isDbConnected) {
    Logger.error(
      'Não foi possível conectar com o banco de dados! Aplicação esta sendo finalizada'
    )
    process.exit(1)
  }

  framework.use(cors())
  framework.use(rateLimiter.handle.bind(rateLimiter))
  framework.use(express.json())

  RouterFramework(framework)

  framework.listen(port, host, () => {
    Logger.info('Banco de dados conectado com sucesso!')
    Logger.info(`Servidor rodando em ${baseUrl}`)
    Logger.info(`API executando na versão ${VersionApiIdentify()}`)
    Logger.info(`Documentação da API disponível em: ${documentation}`)
  })
}
