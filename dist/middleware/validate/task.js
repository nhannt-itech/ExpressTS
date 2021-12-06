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
exports.ValidateTask = void 0;
const models_1 = require("../../models");
const validator_1 = __importDefault(require("./validator"));
class validateTask {
    create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let newTask = new models_1.BaseTask();
            newTask.title = req.body.title;
            newTask.content = req.body.content;
            yield (0, validator_1.default)(newTask, res, next);
        });
    }
    update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let task = new models_1.Task();
            task.title = req.body.title;
            task.content = req.body.content;
            yield (0, validator_1.default)(task, res, next);
        });
    }
}
exports.ValidateTask = new validateTask();
