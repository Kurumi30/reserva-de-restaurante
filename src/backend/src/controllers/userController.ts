import { Request, Response } from "express"
import { UserModel } from "../models/userModel"

export async function userController(req: Request, res: Response) {
  if (!req.body || Object.keys(req.body).length === 0) {
    res.status(400).json({ error: "Dados do usuário não fornecidos" })
    
    return
  }

  const userModel = new UserModel()

  try {
    const created = await userModel.createUser(req.body)

    res.status(201).json(created)
  } catch (err) {
    console.error("Erro ao criar usuário:", err.message)

    res.status(500).json({ error: "Erro ao criar usuário" })
  }
}
