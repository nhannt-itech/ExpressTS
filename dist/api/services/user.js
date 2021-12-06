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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
class UserService {
    register(userDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { full_name, username } = userDto;
            const salt = yield bcrypt_1.default.genSalt(10);
            const password = yield bcrypt_1.default.hash(userDto.password, salt);
            const obj = (0, db_1.default)("user").insert({ full_name, username, password }).returning("*");
            return obj;
        });
    }
    login(userDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = (yield (0, db_1.default)("user").where("username", userDto.username).first().returning("*")) || null;
            const isLogin = yield bcrypt_1.default.compare(userDto.password, user.password);
            if (isLogin) {
                var token = jsonwebtoken_1.default.sign(user, process.env.SECRET_KEY);
                return token;
            }
            else {
                return null;
            }
        });
    }
    delete(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield db_1.default.transaction((trx) => __awaiter(this, void 0, void 0, function* () {
                try {
                    yield trx("task").where("user_id", user_id).del();
                    const res = yield trx("user").where("id", user_id).del();
                    return res;
                    trx.commit();
                }
                catch (_a) {
                    return 0;
                    yield trx.rollback();
                }
            }));
        });
    }
}
exports.default = new UserService();
