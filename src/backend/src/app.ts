import express from "express"
import cors from "cors"
import { errorHandling } from "./services/errorHandling"
import { BadRequestError, NotFoundError } from "./errors"
import { ReservationModel } from "./models/reservationModel"
import { createTables } from "./infrastructure/seed"
import { UserModel } from "./models/userModel"
import { userController } from "./controllers/userController"
import { loginController } from "./controllers/loginController"
import { authMiddleware } from "./middlewares/auth"
import { Database } from "./infrastructure/sqlite"
import { TableModel } from "./models/tableModel"

createTables().catch(error => {
	console.error("Erro ao criar as tabelas:", error)

	process.exit(1)
})

const app = express()

app.use(
	cors({
		methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
		origin: "*",
		// preflightContinue: true,
		// optionsSuccessStatus: 204,
	}),
)
// app.options("*", cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.set("json spaces", 2)

app.post("/user", userController)
app.post("/login", loginController)

app.post("/reserva", authMiddleware, async (req, res) => {
	const { dateTime, tableId, chairs } = req.body
	const clientCpf = req.user.cpf

	if (!clientCpf || !dateTime || !tableId || !chairs) res.status(400).json({ error: "Dados incompletos" })

	const reservationModel = new ReservationModel()

	try {
		const result = await reservationModel.createReservation({
			clientCpf,
			dateTime,
			tableId,
			chairs,
			status: "PENDENTE",
		})

		res.json(result)
	} catch (err) {
		throw new BadRequestError(`Erro ao criar reserva: ${err.message}`)
	}
})

app.get("/user", async (_, res) => {
	const userModel = new UserModel()
	const usersList = await userModel.getUsers()

	res.json(usersList)
})

app.get("/reserva", async (_, res) => {
	const reservas = new ReservationModel()
	const reservasList = await reservas.getAllReservations()

	res.json(reservasList)
})

app.get("/mesas", authMiddleware, async (req, res) => {
	const { dataHora } = req.query

	console.log("Data e hora recebidas:", dataHora)

	const tableModel = new TableModel()
	const unavailableTablesResult = await tableModel.getUnavailableTables(dataHora as string)

	if (unavailableTablesResult.length === 0) res.status(404).json({ error: "Nenhuma mesa reservada para o horário informado." })

	res.json({ ID_MESA: unavailableTablesResult[0].ID_MESA })
})

app.all("*", (req, res) => {
	throw new NotFoundError(`Rota ${req.path} usando o método ${req.method} não foi encontrada!`)
})

app.use(errorHandling)

export default app
