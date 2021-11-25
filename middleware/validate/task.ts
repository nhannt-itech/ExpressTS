import { BaseTask, Task } from "../../models";
import { Request, Response, NextFunction } from "express";
import Validator from "./validator";

class validateTask {
	async create(req: Request, res: Response, next: NextFunction) {
		let newTask = new BaseTask();
		const { title, content } = req.body;
		newTask = { title, content } as BaseTask;

		await Validator(newTask, res);
		next();
	}
	async update(req: Request, res: Response, next: NextFunction) {
		let task = new Task();
		const { id, title, content } = req.body;
		task = { id, title, content } as Task;

		await Validator(task, res);
		next();
	}
}

export const ValidateTask = new validateTask();
