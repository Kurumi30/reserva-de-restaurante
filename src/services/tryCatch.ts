import { Result } from "../types/Result"

export async function tryCatch<T, E = Error>(promise: Promise<T>): Promise<Result<T, E>> {
	try {
		const data = await promise

		return {
			data,
			error: null,
		}
	} catch (err) {
		return {
			data: null,
			error: err as E,
		}
	}
}
