import { DatabaseSync, SQLInputValue, StatementResultingChanges } from "node:sqlite"
import { join } from "node:path"
import { app } from "electron"

export class Database {
	private db: DatabaseSync

	public async connect(filePath?: string): Promise<void> {
		if (filePath) {
			this.db = new DatabaseSync(filePath)

			return
		}

		this.db = new DatabaseSync(
			filePath ||
			join(app.getPath("userData"), "database.db")
			// || join(__dirname, "db", "database.db")
		)
	}

	public async migrate(migrationScript: string): Promise<void> {
		this.db.exec(migrationScript)
	}

	public async exec<T = unknown>(
		sql: string,
		values: SQLInputValue[] = [],
	): Promise<StatementResultingChanges | T> {
		const query = this.db.prepare(sql)

		if (sql.toLowerCase().includes("select *")) return query.all() as T

		return query.run(...values)
	}

	public close(): void {
		this.db.close()
	}
}
