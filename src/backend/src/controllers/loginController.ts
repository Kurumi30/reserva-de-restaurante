import { NextFunction, Request, Response } from "express"
import { UserModel } from "../models/userModel"
import jwt from "jsonwebtoken"
import { NotAuthorizedError } from "../errors"
import config from "../config"
import { UserPayload } from "../types/IUser"

export async function loginController(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body
    const userModel = new UserModel()
    const users = await userModel.getUsers() as Array<UserPayload>

    const user = users.find(user => user.EMAIL === email)

    if (!user || user.SENHA !== password) return next(new NotAuthorizedError("E-mail ou senha inválidos"))

    const userCPF = await userModel.getUserByEmail(user.EMAIL)
    const userName = userCPF[0].NOME

    const token = jwt.sign(
      { email: user.EMAIL, cpf: userCPF[0].CPF },
      config.jwt.secret,
      { expiresIn: config.jwt.expiresIn },
    )

    res.json({ token, NOME: userName })
  } catch (e) {
    next(e)
  }
}
