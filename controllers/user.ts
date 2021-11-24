import { Request, Response, NextFunction } from "express";
import UserService from "../services/user";
import { User, BaseUser } from "../interfaces/user";
import { success, error, validation } from "../utils/response-api";

class UserController {
	async register(req: Request, res: Response, next: NextFunction) {
		try {
			const newUser: BaseUser = req.body;
			const results = await UserService.register(newUser);
			res.status(200).json(success(results, "OK", res.statusCode));
		} catch (err) {
			next(err);
		}
	}
}

export default new UserController();
