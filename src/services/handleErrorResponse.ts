import { IErrorResponse } from "../types/IErrorResponse"

export function handleErrorResponse({ err, res, status }: IErrorResponse) {
  res.status(status).json({
    status: status,
    name: err.name,
    message: err.message,
  })
}
