import { Request, Response } from "express"
import { ReservationModel } from "../models/reservationModel"
import { BadRequestError } from "../errors"

export async function reservaController(req: Request, res: Response) {
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
}

export async function reservations(_: Request, res: Response) {
  const reservas = new ReservationModel()
  const reservasList = await reservas.getAllReservations()

  res.json(reservasList)
}
