import express, { NextFunction } from "express";
import { error } from "../utils/response-api";

export function errorHandler(
	err: Error,
	req: express.Request,
	res: express.Response,
	next: NextFunction
) {
	if (err.name === "UnauthorizedError") {
		// jwt authentication error
		return res.status(401).json(error("Invalid Token", res.statusCode));
	}
	// default to 500 server error
	return res.status(500).json(error(err.message, res.statusCode));
}
