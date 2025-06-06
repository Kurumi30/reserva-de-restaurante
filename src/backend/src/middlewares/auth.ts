import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"
import { BadRequestError } from "../errors"
import config from "../config"
import { User } from "../types/IUser"

export function authMiddleware(req: Request, _: Response, next: NextFunction) {
  const authHeader = req.headers.authorization

  if (!authHeader) next(new BadRequestError("Token não fornecido"))

  const [, token] = authHeader.split(" ")

  try {
    const decoded = jwt.verify(token, config.jwt.secret)

    req.user = decoded as User

    next()
  } catch (err) {
    next(new BadRequestError(`Token inválido: ${err.message}`))
  }
}
