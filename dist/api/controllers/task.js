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
exports.TaskController = void 0;
const task_1 = __importDefault(require("../services/task"));
const response_api_1 = require("../../utils/response-api");
class taskController {
    create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                let task = Object.assign({ user_id: user.id }, req.body);
                const results = yield task_1.default.create(task);
                res.status(200).json((0, response_api_1.success)(results, "OK", res.statusCode));
            }
            catch (err) {
                next(err);
            }
        });
    }
    update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                let task = Object.assign({ user_id: user.id }, req.body);
                const results = yield task_1.default.update(task);
                res.status(200).json((0, response_api_1.success)(results, "OK", res.statusCode));
            }
            catch (err) {
                next(err);
            }
        });
    }
    delete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.query.id;
                const results = yield task_1.default.delete(id);
                res.status(200).json((0, response_api_1.success)(results, "OK", res.statusCode));
            }
            catch (err) {
                next(err);
            }
        });
    }
    search(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { key, offset, pagesize } = req.query;
                const results = yield task_1.default.search(key, offset, pagesize);
                res.status(200).json((0, response_api_1.success)(results, "OK", res.statusCode));
            }
            catch (err) {
                next(err);
            }
        });
    }
}
exports.TaskController = new taskController();
