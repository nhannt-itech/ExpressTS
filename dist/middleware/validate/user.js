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
exports.ValidateUser = void 0;
const user_1 = require("../../models/user");
const validator_1 = __importDefault(require("./validator"));
class validateUser {
    register(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let newUser = new user_1.BaseUser();
            newUser.full_name = req.body.full_name;
            newUser.username = req.body.username;
            newUser.password = req.body.password;
            yield (0, validator_1.default)(newUser, res, next);
        });
    }
}
exports.ValidateUser = new validateUser();
