"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const response_api_1 = require("../../utils/response-api");
const passport_1 = __importDefault(require("passport"));
const auth = (roles = []) => {
    return (req, res, next) => {
        passport_1.default.authenticate("jwt", { session: false }, function (err, user, info) {
            if (err) {
                next(err);
            }
            if (!user) {
                return res.status(401).json((0, response_api_1.error)("Unauthenticated", res.statusCode));
            }
            else if (roles.length && !roles.includes(user.role)) {
                return res.status(401).json((0, response_api_1.error)("Unauthorized", res.statusCode));
            }
            else {
                req.user = user;
                next();
            }
        })(req, res, next);
    };
};
exports.auth = auth;
