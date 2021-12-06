"use strict";
/**
 * @desc    This file contain Success and Error response for sending to client / user
 * @author  Huda Prasetyo
 * @since   2020
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.validation = exports.error = exports.success = void 0;
const success = (results, message, statusCode) => {
    return {
        message,
        error: false,
        code: statusCode,
        results,
    };
};
exports.success = success;
const error = (message, statusCode) => {
    // List of common HTTP request code
    const codes = [200, 201, 400, 401, 404, 403, 422, 500];
    // Get matched code
    const findCode = codes.find((code) => code == statusCode);
    if (!findCode)
        statusCode = 500;
    else
        statusCode = findCode;
    return {
        message,
        error: true,
        code: statusCode,
    };
};
exports.error = error;
const validation = (errors) => {
    return {
        message: "Validation errors",
        error: true,
        code: 422,
        errors,
    };
};
exports.validation = validation;
