import express, { NextFunction, Request, Response } from "express"
import cors from "cors"
import { BadRequestError, NotAuthorizedError, NotFoundError } from "./errors"
import { handleErrorResponse } from "./services/handleErrorResponse"

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

// app.use(routes)

app.route("/").get((req, res) => {})

app.all("*", (req, res) => {
	throw new NotFoundError(`Rota ${req.path} usando o método ${req.method} não foi encontrada!`)
})

app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
	if (err instanceof NotFoundError) {
		handleErrorResponse({ status: 404, err, res })

		return
	}

	if (err instanceof NotAuthorizedError) {
		handleErrorResponse({ status: 401, err, res })

		return
	}

	if (err instanceof BadRequestError) {
		handleErrorResponse({ status: 400, err, res })

		return
	}

	handleErrorResponse({ status: 500, err, res })
})

export default app
