import { tryCatch } from "../services/tryCatch"
import { Database } from "./sqlite"

export async function createTables() {
	const db = new Database()

	const { error: connectionError } = await tryCatch(db.connect())

	if (connectionError) throw new Error(`Erro ao conectar com o sqlite: ${connectionError.message}`)

	await db.migrate(
		`CREATE TABLE IF NOT EXISTS MESA (
      ID_MESA     INTEGER PRIMARY KEY AUTOINCREMENT,
      NUMERO_MESA INTEGER UNIQUE NOT NULL,
      CAPACIDADE  INTEGER NOT NULL
    )`,
	)

	await db.migrate(
		`CREATE TABLE IF NOT EXISTS CLIENTE (
      CPF             TEXT PRIMARY KEY,
      NOME_COMPLETO   TEXT NOT NULL,
      EMAIL           TEXT NOT NULL UNIQUE,
      NUMERO_MESA     INTEGER NOT NULL,

      FOREIGN KEY (NUMERO_MESA) REFERENCES MESA(NUMERO_MESA)
    )`,
	)

  await db.migrate(
    `CREATE TABLE IF NOT EXISTS USUARIO (
      ID_USUARIO  INTEGER PRIMARY KEY AUTOINCREMENT,
      NOME        TEXT NOT NULL,
      EMAIL       TEXT NOT NULL UNIQUE,
      SENHA       TEXT NOT NULL,
      CPF         TEXT NOT NULL UNIQUE
    )`
  )

	await db.migrate(
		`CREATE TABLE IF NOT EXISTS RESERVA (
      ID_RESERVA    INTEGER PRIMARY KEY AUTOINCREMENT,
      CPF_CLIENTE   TEXT NOT NULL,
      ID_MESA       INTEGER NOT NULL,
      DATA_HORA     TEXT NOT NULL,
      STATUS        CHECK (STATUS IN ('PENDENTE', 'CONFIRMADA', 'CANCELADA', 'FINALIZADA')) NOT NULL,

      FOREIGN KEY (CPF_CLIENTE) REFERENCES CLIENTE(CPF),
      FOREIGN KEY (ID_MESA) REFERENCES MESA(ID_MESA)
    )`,
	)
}
