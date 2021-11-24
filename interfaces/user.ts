export interface User extends BaseUser {
	id: BigInt;
}

export interface BaseUser {
	full_name: string;
	username: string;
	password: string;
	created_at: Date;
	updated_at: Date;
}
