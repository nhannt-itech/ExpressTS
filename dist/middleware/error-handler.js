"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const response_api_1 = require("../utils/response-api");
function errorHandler(err, req, res, next) {
    return res.status(500).json((0, response_api_1.error)(err.message, res.statusCode));
}
exports.errorHandler = errorHandler;
