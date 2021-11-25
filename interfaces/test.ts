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
	IsNotEmpty,
} from "class-validator";

export class Post {
	@Length(10, 20)
	title: string;

	@IsNotEmpty()
	example: string;

	@IsInt()
	@Min(0)
	@Max(10)
	rating: number;

	@IsEmail()
	email: string;

	@IsFQDN()
	site: string;

	@IsDate()
	createDate: Date;
}
