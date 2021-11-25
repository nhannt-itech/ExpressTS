import { Request, Response, NextFunction } from "express";
import { error } from "../utils/response-api";
import passport from "passport";

const auth = (req: Request, res: Response, next: NextFunction) => {
	passport.authenticate("jwt", { session: false }, function (err, user, info) {
		if (err) {
			next(err);
		}
		if (!user) {
			res.status(401).json(error("Unauthorize", res.statusCode));
		} else {
			req.user = user;
			next();
		}
	})(req, res, next);
};

export default auth;
