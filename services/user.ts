import { BaseUser, User, BaseLoginUser } from "../interfaces/user";
import db from "../database/db";
import jwt, { Secret } from "jsonwebtoken";

class UserService {
	async register(userDto: BaseUser): Promise<User> {
		const { full_name, username, password } = userDto;
		const obj = db("user").insert({ full_name, username, password }).returning<User>("*");
		return obj;
	}
	async get(id: string): Promise<User> {
		const obj = (await db("user").where("id", id).first().returning<User>("*")) || null;
		return obj;
	}
	async login(userDto: BaseLoginUser): Promise<string | null> {
		const user =
			(await db("user")
				.where("username", userDto.username)
				.and.where("password", userDto.password)
				.first()
				.returning<User>("*")) || null;
		if (user) {
			var token = jwt.sign(user, process.env.SECRET_KEY as string);
			return token;
		} else {
			return null;
		}
	}
}

export default new UserService();
