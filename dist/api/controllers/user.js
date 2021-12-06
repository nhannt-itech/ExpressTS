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
exports.UserController = void 0;
const response_api_1 = require("../../utils/response-api");
const user_1 = __importDefault(require("../services/user"));
const response_api_2 = require("../../utils/response-api");
class userController {
    register(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const results = yield user_1.default.register(req.body);
                res.status(200).json((0, response_api_2.success)(results, "OK", res.statusCode));
            }
            catch (err) {
                next(err);
            }
        });
    }
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let user = req.body;
                const results = yield user_1.default.login(user);
                results
                    ? res.status(200).json((0, response_api_2.success)(results, "OK", res.statusCode))
                    : res.status(400).json((0, response_api_1.error)("wrong username or password", res.statusCode));
            }
            catch (err) {
                next(err);
            }
        });
    }
    profile(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.status(200).json((0, response_api_2.success)(req.user, "OK", res.statusCode));
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
                const results = yield user_1.default.delete(id);
                res.status(200).json((0, response_api_2.success)(results, "OK", res.statusCode));
            }
            catch (err) {
                next(err);
            }
        });
    }
}
exports.UserController = new userController();
