import { BaseUser, User } from "../interfaces/user";
import db from "../database/db";

class UserService {
	async register(userDto: BaseUser): Promise<User> {
		const { full_name, username, password } = userDto;
		const obj = await db("user").insert({ full_name, username, password }).returning<User>("*");
		return obj;
	}
}

export default new UserService();
