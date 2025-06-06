import { Database } from "../infrastructure/sqlite"

export class ReservationModel {
	private db: Database

	constructor() {
		this.db = new Database()
		this.db.connect()
	}

	async createReservation({ clientCpf, dateTime, status, tableId, chairs }: IReservation) {
		return await this.db.exec(
			`INSERT INTO RESERVA (STATUS, DATA_HORA, CPF_CLIENTE, ID_MESA, CADEIRAS) VALUES (?, ?, ?, ?, ?)`,
			[status, dateTime, clientCpf, tableId, chairs],
		)
	}

	async getAllReservations(): Promise<IReservation[] | unknown> {
		return await this.db.exec<IReservation>(`SELECT * FROM RESERVA INNER JOIN USUARIO ON USUARIO.CPF = RESERVA.CPF_CLIENTE`)
	}

	async deleteReservation(id: number): Promise<unknown> {
		return await this.db.exec(`DELETE FROM RESERVA WHERE Id_Reserva = ?`, [id])
	}
}
