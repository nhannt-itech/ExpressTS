import { validate } from "class-validator";
import { Response } from "express";
import { validation } from "../../utils/response-api";

const Validator = async (object: any, res: Response) => {
	const resErrors = await validate(object);
	const errors = resErrors.map((item) => item.constraints);
	if (errors.length) res.status(422).json(validation(errors));
};

export default Validator;
