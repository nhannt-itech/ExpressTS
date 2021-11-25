import { IsNotEmpty } from "class-validator";

export class Task implements BaseTask {
	@IsNotEmpty()
	id: BigInt;

	@IsNotEmpty()
	title: string;

	@IsNotEmpty()
	content: string;

	user_id: BigInt;

	created_at: Date;
	updated_at: Date;
}

export class BaseTask {
	@IsNotEmpty()
	title: string;

	@IsNotEmpty()
	content: string;

	user_id: BigInt;

	created_at: Date;
	updated_at: Date;
}

export type SearchBO = {
	key: string;
	offset: number;
	pagesize: number;
};
