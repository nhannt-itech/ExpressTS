import { IsNotEmpty } from "class-validator";

export interface User extends BaseUser {
	id: BigInt;
}

export class BaseUser {
	@IsNotEmpty()
	full_name: string;

	@IsNotEmpty()
	username: string;

	@IsNotEmpty()
	password: string;
	role: string;
	created_at: Date;
	updated_at: Date;
}

export class BaseLoginUser {
	username: string;
	password: string;
}
