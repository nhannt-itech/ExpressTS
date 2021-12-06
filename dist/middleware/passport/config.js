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
const passport_jwt_1 = require("passport-jwt");
const passport_1 = __importDefault(require("passport"));
const db_1 = __importDefault(require("../../database/db"));
passport_1.default.use(new passport_jwt_1.Strategy({
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderWithScheme("Bearer"),
    secretOrKey: process.env.SECRET_KEY,
}, function (jwt_payload, done) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = (yield (0, db_1.default)("user").where("id", jwt_payload.id).first().returning("*")) || null;
            if (user) {
                done(null, user);
            }
            else {
                done(null, false);
            }
        }
        catch (err) {
            return done(err, false);
        }
    });
}));
exports.default = passport_1.default;
