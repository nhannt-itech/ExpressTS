import { BaseUser } from "../../models/user";
import { Request, Response, NextFunction } from "express";
import Validator from "./validator";

class validateUser {
	async register(req: Request, res: Response, next: NextFunction) {
		let newUser = new BaseUser();

		newUser.full_name = req.body.full_name;
		newUser.username = req.body.username;
		newUser.password = req.body.password;

		await Validator(newUser, res, next);
	}
}

export const ValidateUser = new validateUser();
