import express from "express"
import cors from "cors"
import { errorHandling } from "./services/errorHandling"
import { NotFoundError } from "./errors"
import { createTables } from "./infrastructure/seed"
import routes from "./routes/routes"

createTables().catch(error => {
	console.error("Erro ao criar as tabelas:", error)

	process.exit(1)
})

const app = express()

app.use(
	cors({
		methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
		origin: "*",
	}),
)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.set("json spaces", 2)

app.use(routes)

app.all("*", (req, _) => {
	throw new NotFoundError(`Rota ${req.path} usando o método ${req.method} não foi encontrada!`)
})

app.use(errorHandling)

export default app
