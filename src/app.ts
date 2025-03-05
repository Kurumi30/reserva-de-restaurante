import express from "express"
import cors from "cors"

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

app.all("*", (req, res) => {
	res
		.status(404)
		.json({
			message: `Rota ${req.path} usando o método ${req.method} não foi encontrada!`,
		})
})

export default app
