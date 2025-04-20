import express from "express"
import cors from "cors"
import { errorHandling } from "./services/errorHandling"
import { NotFoundError } from "./errors"

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(
	cors({
		methods: ["GET", "POST", "PUT", "DELETE"],
		origin: "*",
	}),
)

app.set("json spaces", 2)

app.route("/").get((req, res) => {
	res.send("Hello, world!")
})

app.all("*", (req, res) => {
	throw new NotFoundError(`Rota ${req.path} usando o método ${req.method} não foi encontrada!`)
})

app.use(errorHandling)

export default app
