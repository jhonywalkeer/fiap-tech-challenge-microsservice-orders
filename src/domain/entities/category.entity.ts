import { Base } from '@domain/entities'

export type Category = Base & {
  name: string
  description: string
}
