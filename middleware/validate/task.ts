import { BaseTask, Task } from "../../models";
import { Request, Response, NextFunction } from "express";
import Validator from "./validator";

class validateTask {
	async create(req: Request, res: Response, next: NextFunction) {
		let newTask = new BaseTask();

		newTask.title = req.body.title;
		newTask.content = req.body.content;

		await Validator(newTask, res);
		next();
	}
	async update(req: Request, res: Response, next: NextFunction) {
		let task = new Task();

		task.title = req.body.title;
		task.content = req.body.content;

		await Validator(task, res);
		next();
	}
}

export const ValidateTask = new validateTask();
