import { BaseUser, User, BaseLoginUser } from "../../models";
import db from "../../database/db";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

class UserService {
	async register(userDto: BaseUser): Promise<User> {
		const { full_name, username } = userDto;

		const salt = await bcrypt.genSalt(10);
		const password = await bcrypt.hash(userDto.password, salt);

		const obj = db("user").insert({ full_name, username, password }).returning<User>("*");
		return obj;
	}
	async login(userDto: BaseLoginUser): Promise<string | null> {
		const user =
			(await db("user").where("username", userDto.username).first().returning<User>("*")) || null;
		const isLogin = await bcrypt.compare(userDto.password, user.password);
		if (isLogin) {
			var token = jwt.sign(user, process.env.SECRET_KEY as string);
			return token;
		} else {
			return null;
		}
	}
	async delete(user_id: string): Promise<number> {
		return await db.transaction(async (trx) => {
			try {
				await trx("task").where("user_id", user_id).del();
				const res = await trx("user").where("id", user_id).del();
				return res;
				trx.commit();
			} catch {
				return 0;
				await trx.rollback();
			}
		});
	}
}

export default new UserService();
