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
      CAPACIDADE  INTEGER NOT NULL CHECK (CAPACIDADE <= 6 AND CAPACIDADE >= 1)
    )`,
  )

  console.log("Tabela MESA criada com sucesso!")

  // INSERIR AS MESAS
  await db.exec(`
    INSERT OR IGNORE INTO MESA (NUMERO_MESA, CAPACIDADE) VALUES
    (1, 6),
    (2, 6),
    (3, 6),
    (4, 6),
    (5, 6),
    (6, 6),
    (7, 6),
    (8, 6),
    (9, 6),
    (10, 6),
    (11, 6),
    (12, 6)
    `)

  console.log("Mesas inseridas com sucesso!")

  // await db.migrate(
  //   `CREATE TABLE IF NOT EXISTS CLIENTE (
  //     CPF             TEXT PRIMARY KEY,
  //     NOME_COMPLETO   TEXT NOT NULL,
  //     EMAIL           TEXT NOT NULL UNIQUE,
  //     NUMERO_MESA     INTEGER NOT NULL,

  //     FOREIGN KEY (NUMERO_MESA) REFERENCES MESA(NUMERO_MESA)
  //   )`,
  // )

  // console.log("Tabela CLIENTE criada com sucesso!")

  await db.migrate(
    `CREATE TABLE IF NOT EXISTS USUARIO (
      CPF         TEXT PRIMARY KEY,
      NOME        TEXT NOT NULL,
      EMAIL       TEXT NOT NULL UNIQUE,
      SENHA       TEXT NOT NULL
    )`
  )

  console.log("Tabela USUARIO criada com sucesso!")

  await db.migrate(
    `CREATE TABLE IF NOT EXISTS RESERVA (
      ID_RESERVA    INTEGER PRIMARY KEY AUTOINCREMENT,
      CPF_CLIENTE   TEXT NOT NULL,
      ID_MESA       INTEGER NOT NULL,
      DATA_HORA     TEXT NOT NULL,
      CADEIRAS      INTEGER NOT NULL,
      STATUS        CHECK (STATUS IN ('PENDENTE', 'CONFIRMADA', 'CANCELADA', 'FINALIZADA')) NOT NULL,

      --FOREIGN KEY (CPF_CLIENTE) REFERENCES CLIENTE(CPF),
      FOREIGN KEY (ID_MESA) REFERENCES MESA(ID_MESA)
    )`,
  )

  console.log("Tabela RESERVA criada com sucesso!")
}
