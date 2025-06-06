import { Request, Response } from "express"
import { TableModel } from "../models/tableModel"

export async function tableController(req: Request, res: Response) {
  const { dataHora } = req.query
  
  const tableModel = new TableModel()
  const unavailableTablesResult = await tableModel.getUnavailableTables(dataHora as string) as Array<{ ID_MESA: number }>

  if (unavailableTablesResult.length === 0) res.status(404).json({ error: "Nenhuma mesa reservada para o horário informado." })

  res.json({ ID_MESA: unavailableTablesResult[0].ID_MESA })
}
