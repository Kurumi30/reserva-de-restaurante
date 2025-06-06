export type User = {
  email: string
  cpf: string
}

export type UserPayload = {
  EMAIL: string
  SENHA: string
}

export interface UserInfo {
  cpf: string
  name: string
  email: string
  password: string
}

declare global {
  namespace Express {
    interface Request {
      user?: User
    }
  }
}
