import { Database } from "../infrastructure/sqlite";

export class TableModel {
  private db: Database

  constructor() {
    this.db = new Database()
    this.db.connect()
  }

  async getAvailableTables<T>() {
    return this.db.exec<T[]>(`SELECT * FROM RESERVA`)
  }

  async getUnavailableTables(dataHora: string) {
    return this.db.exec(
      `SELECT * FROM RESERVA WHERE DATA_HORA LIKE '${dataHora}' AND STATUS IN ('PENDENTE')`
    )
  }
}
