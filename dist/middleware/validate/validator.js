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
Object.defineProperty(exports, "__esModule", { value: true });
const class_validator_1 = require("class-validator");
const response_api_1 = require("../../utils/response-api");
const Validator = (object, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const resErrors = yield (0, class_validator_1.validate)(object);
    const errors = resErrors.map((item) => item.constraints);
    if (errors.length)
        return res.status(422).json((0, response_api_1.validation)(errors));
    else
        next();
});
exports.default = Validator;
