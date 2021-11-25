import { User } from "./../interfaces/user";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import passport from "passport";
import db from "../database/db";

passport.use(
	new JwtStrategy(
		{
			jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
			secretOrKey: process.env.SECRET_KEY,
		},
		async function (jwt_payload, done) {
			try {
				const user =
					(await db("user").where("id", jwt_payload.id).first().returning<User>("*")) || null;
				if (user) {
					done(null, user);
				} else {
					done(null, false);
				}
			} catch (err) {
				return done(err, false);
			}
		}
	)
);

export default passport;
