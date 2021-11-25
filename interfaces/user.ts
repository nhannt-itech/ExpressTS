import {
	validate,
	validateOrReject,
	Contains,
	IsInt,
	Length,
	IsEmail,
	IsFQDN,
	IsDate,
	Min,
	Max,
} from "class-validator";

export interface User extends BaseUser {
	id: BigInt;
}

export class BaseUser {
	full_name: string;
	username: string;
	password: string;
	created_at: Date;
	updated_at: Date;
}

export class BaseLoginUser {
	username: string;
	password: string;
}
