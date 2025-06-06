import { NextFunction, Request, Response } from "express"
import { IErrorResponse } from "../types/IErrorResponse"
import { BadRequestError, NotAuthorizedError, NotFoundError } from "../errors"

function handleErrorResponse({ err, res, status }: IErrorResponse) {
	res.status(status).json({
		status: status,
		name: err.name,
		message: err.message,
	})
}

export function errorHandling(err: Error, _req: Request, res: Response, _: NextFunction) {
	if (err instanceof NotFoundError) {
		handleErrorResponse({ status: 404, err, res })

		// return
	}

	if (err instanceof NotAuthorizedError) {
		handleErrorResponse({ status: 401, err, res })

		// return
	}

	if (err instanceof BadRequestError) {
		handleErrorResponse({ status: 400, err, res })

		// return
	}

	handleErrorResponse({ status: 500, err, res })
}
