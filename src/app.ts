import express from "express"
import cors from "cors"

const app = express()

app.use(
	cors({
		methods: ["GET", "POST", "PUT", "DELETE"],
    origin: "*",
	}),
)

app.set("json spaces", 2)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {
	res.send("Hello Fernando!")
})

export default app
