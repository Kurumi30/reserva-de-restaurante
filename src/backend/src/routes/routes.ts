import { Router } from "express"
import { listAllUsers, userController } from "../controllers/userController"
import { loginController } from "../controllers/loginController"
import { authMiddleware } from "../middlewares/auth"
import { reservaController, reservations } from "../controllers/reservaController"
import { tableController } from "../controllers/tableController"

const routes = Router()

routes.post("/user", userController)
routes.post("/login", loginController)
routes.post("/reserva", authMiddleware, reservaController)

routes.get("/user", listAllUsers)
routes.get("/reserva", reservations)
routes.get("/mesas", authMiddleware, tableController)

export default routes
