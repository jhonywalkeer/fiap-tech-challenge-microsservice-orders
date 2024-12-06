import { Base } from '@domain/entities'

export type User = Base & {
  name: string
  email: string
  social_security_number: string
}
