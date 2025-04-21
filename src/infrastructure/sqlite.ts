import { DatabaseSync, StatementResultingChanges, SupportedValueType } from "node:sqlite"
import { join } from "node:path"

export class Database {
	private db: DatabaseSync

	public async connect(filePath?: string): Promise<void> {
		if (filePath) {
			this.db = new DatabaseSync(filePath)

			return
		}

		// Se não passar o caminho do arquivo, usa o padrão
		this.db = new DatabaseSync(filePath || join(__dirname, "..", "db", "database.db"))
	}

	// Para criar as tabelas
	public async migrate(migrationScript: string): Promise<void> {
		this.db.exec(migrationScript)
	}

	public async exec<T = unknown>(
		sql: string,
		values: SupportedValueType[] = [],
	): Promise<StatementResultingChanges | T> {
		const query = this.db.prepare(sql)

		if (sql.toLowerCase().startsWith("select")) return query.all() as T

		return query.run(...values)
	}

	public close(): void {
		this.db.close()
	}
}
