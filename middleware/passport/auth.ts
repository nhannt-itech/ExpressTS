import { Request, Response, NextFunction } from "express";
import { error } from "../../utils/response-api";
import passport from "passport";
import { BaseUser } from "../../models/user";

export const auth = (roles = [] as string[]) => {
	return (req: Request, res: Response, next: NextFunction) => {
		passport.authenticate("jwt", { session: false }, function (err, user: BaseUser, info) {
			if (err) {
				next(err);
			}
			if (!user) {
				return res.status(401).json(error("Unauthenticated", res.statusCode));
			} else if (roles.length && !roles.includes(user.role)) {
				return res.status(401).json(error("Unauthorized", res.statusCode));
			} else {
				req.user = user;
				next();
			}
		})(req, res, next);
	};
};
