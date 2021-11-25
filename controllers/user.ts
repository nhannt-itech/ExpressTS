import { Request, Response, NextFunction } from "express";
import UserService from "../services/user";
import { User, BaseUser, BaseLoginUser } from "../interfaces/user";
import { success, error, validation } from "../utils/response-api";
import jwt from "jsonwebtoken";
import { IncomingHttpHeaders } from "http";

class UserController {
	async register(req: Request, res: Response, next: NextFunction) {
		try {
			let newUser: BaseUser = req.body;
			const results = await UserService.register(newUser);
			res.status(200).json(success(results, "OK", res.statusCode));
		} catch (err) {
			next(err);
		}
	}
	async get(req: Request, res: Response, next: NextFunction) {
		try {
			const { id } = req.query;
			const results = await UserService.get(id as string);
			res.status(200).json(success(results, "OK", res.statusCode));
		} catch (err) {
			next(err);
		}
	}
	async login(req: Request, res: Response, next: NextFunction) {
		try {
			let user: BaseLoginUser = req.body;
			const results = await UserService.login(user);
			console.log(results);
			res.status(200).json(success(results, "OK", res.statusCode));
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
}

const getToken = function (headers: IncomingHttpHeaders) {
	if (headers && headers.authorization) {
		var parted = headers.authorization.split(" ");
		if (parted.length === 2) {
			return parted[1];
		} else {
			return null;
		}
	} else {
		return null;
	}
};

export default new UserController();
