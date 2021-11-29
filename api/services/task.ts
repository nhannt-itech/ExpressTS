import { BaseTask, Task } from "../../models";
import db from "../../database/db";

class TaskService {
	async create(taskDto: BaseTask): Promise<Task> {
		const { title, content, user_id } = taskDto;
		const obj = db("task").insert({ title, content, user_id }).returning<Task>("*");
		return obj;
	}
	async update(taskDto: Task): Promise<Task> {
		const { id, title, content } = taskDto;
		const obj =
			(await db("task").where("id", "=", id).update({ title, content }).returning<Task>("*")) ||
			null;
		return obj;
	}
	async delete(task_id: string): Promise<number> {
		const id = await db("task").where("id", "=", task_id).del();
		return id;
	}
	async search(key = "", offset = 0, pagesize = 10): Promise<Array<Task>> {
		const arr = await db("task")
			.join("user", { "task.user_id": "user.id" })
			.select("task.*", "user.full_name as user_name")
			.where("task.title", "like", key + "%")
			.limit(pagesize)
			.offset(offset);
		return arr;
	}
}

export default new TaskService();
