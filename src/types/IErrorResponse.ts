import { Response } from "express"

export interface IErrorResponse {
	res: Response
	status: number
	err: Error
}
