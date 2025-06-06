import { Database } from "../infrastructure/sqlite"
import { UserInfo } from "../types/IUser"

export class UserModel {
  private db: Database

  constructor() {
    this.db = new Database()
    this.db.connect()
  }

  async createUser(payload: UserInfo) {
    const { cpf, email, name, password } = payload

    return this.db.exec(
      `INSERT INTO USUARIO (CPF, NOME, EMAIL, SENHA) VALUES (?, ?, ?, ?)`,
      [cpf, name, email, password],
    )
  }

  async getUserByEmail(email: string) {
    return await this.db.exec(
      `SELECT * FROM USUARIO WHERE EMAIL = '${email}'`,
    )
  }

  async getUsers() {
    return await this.db.exec(
      `SELECT * FROM USUARIO`,
    )
  }

  async deleteUser(id: number | string): Promise<unknown> {
    return this.db.exec(`DELETE FROM USUARIO WHERE CPF = ?`, [id])
  }
}