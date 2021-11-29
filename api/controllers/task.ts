import { BaseTask } from "../../models/task";
import { Request, Response, NextFunction } from "express";
import TaskService from "../services/task";
import { Task, User } from "../../models";
import { success } from "../../utils/response-api";

class taskController {
	async create(req: Request, res: Response, next: NextFunction) {
		try {
			const user = req.user as User;
			let task: BaseTask = { user_id: user.id, ...req.body };
			const results = await TaskService.create(task);
			res.status(200).json(success(results, "OK", res.statusCode));
		} catch (err) {
			next(err);
		}
	}
	async update(req: Request, res: Response, next: NextFunction) {
		try {
			const user = req.user as User;
			let task: Task = { user_id: user.id, ...req.body };
			const results = await TaskService.update(task);
			res.status(200).json(success(results, "OK", res.statusCode));
		} catch (err) {
			next(err);
		}
	}
	async delete(req: Request, res: Response, next: NextFunction) {
		try {
			const id = req.query.id as string;

			const results = await TaskService.delete(id);
			res.status(200).json(success(results, "OK", res.statusCode));
		} catch (err) {
			next(err);
		}
	}
	async search(req: Request, res: Response, next: NextFunction) {
		try {
			const { key, offset, pagesize } = req.query as any;

			const results = await TaskService.search(key, offset, pagesize);
			res.status(200).json(success(results, "OK", res.statusCode));
		} catch (err) {
			next(err);
		}
	}
}

export const TaskController = new taskController();
