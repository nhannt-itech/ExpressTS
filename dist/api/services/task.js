"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../../database/db"));
class TaskService {
    create(taskDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, content, user_id } = taskDto;
            const obj = (0, db_1.default)("task").insert({ title, content, user_id }).returning("*");
            return obj;
        });
    }
    update(taskDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, title, content } = taskDto;
            const obj = (yield (0, db_1.default)("task").where("id", "=", id).update({ title, content }).returning("*")) ||
                null;
            return obj;
        });
    }
    delete(task_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = yield (0, db_1.default)("task").where("id", "=", task_id).del();
            return id;
        });
    }
    search(key = "", offset = 0, pagesize = 10) {
        return __awaiter(this, void 0, void 0, function* () {
            const arr = yield (0, db_1.default)("task")
                .join("user", { "task.user_id": "user.id" })
                .select("task.*", "user.full_name as user_name")
                .where("task.title", "like", key + "%")
                .limit(pagesize)
                .offset(offset);
            return arr;
        });
    }
}
exports.default = new TaskService();
