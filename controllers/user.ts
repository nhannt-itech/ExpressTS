import { error } from "./../utils/response-api";
import { Request, Response, NextFunction } from "express";
import UserService from "../services/user";
import { BaseLoginUser } from "../models/user";
import { success } from "../utils/response-api";

class userController {
	async register(req: Request, res: Response, next: NextFunction) {
		try {
			const results = await UserService.register(req.body);
			res.status(200).json(success(results, "OK", res.statusCode));
		} catch (err) {
			next(err);
		}
	}
	async login(req: Request, res: Response, next: NextFunction) {
		try {
			let user: BaseLoginUser = req.body;
			const results = await UserService.login(user);
			results
				? res.status(200).json(success(results, "OK", res.statusCode))
				: res.status(400).json(error("wrong username or password", res.statusCode));
		} catch (err) {
			next(err);
		}
	}
	async profile(req: Request, res: Response, next: NextFunction) {
		try {
			res.status(200).json(success(req.user, "OK", res.statusCode));
		} catch (err) {
			next(err);
		}
	}
	async delete(req: Request, res: Response, next: NextFunction) {
		try {
			const id = req.query.id as string;

			const results = await UserService.delete(id);
			res.status(200).json(success(results, "OK", res.statusCode));
		} catch (err) {
			next(err);
		}
	}
}

export const UserController = new userController();
