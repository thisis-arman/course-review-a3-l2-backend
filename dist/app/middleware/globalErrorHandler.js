"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const handleZodError_1 = require("../errors/handleZodError");
const handleCastError_1 = require("../errors/handleCastError");
const handleDuplicateError_1 = require("../errors/handleDuplicateError");
const AppError_1 = __importDefault(require("../errors/AppError"));
const handleValidationError_1 = require("../errors/handleValidationError");
const globalErrorHandler = (err, req, res, next) => {
    let statusCode = err.statusCode || 500;
    let message = err.message || "something went wrong";
    let errorSources = [
        {
            path: "",
            message: "Something went wrong",
        },
    ];
    if (err instanceof zod_1.ZodError) {
        const meaningFulError = (0, handleZodError_1.handleZodError)(err);
        console.log({ meaningFulError });
        statusCode = meaningFulError === null || meaningFulError === void 0 ? void 0 : meaningFulError.statusCode;
        message = meaningFulError.message;
        errorSources = meaningFulError.errorSources;
    }
    else if ((err === null || err === void 0 ? void 0 : err.name) === "validationError") {
        const meaningFulError = (0, handleValidationError_1.handleValidationError)(err);
        statusCode = meaningFulError.statusCode;
        message = meaningFulError.message;
        errorSources = meaningFulError.errorSources;
    }
    else if ((err === null || err === void 0 ? void 0 : err.name) === "CastError") {
        const meaningFulError = (0, handleCastError_1.handleCastError)(err);
        statusCode = meaningFulError.statusCode;
        message = meaningFulError.message;
        errorSources = meaningFulError.errorSources;
    }
    else if ((err === null || err === void 0 ? void 0 : err.code) === "11000") {
        const meaningFulError = (0, handleDuplicateError_1.handleDuplicateError)(err);
        statusCode = meaningFulError.statusCode;
        message = meaningFulError.message;
        errorSources = meaningFulError.errorSources;
    }
    else if (err instanceof AppError_1.default) {
        statusCode = err === null || err === void 0 ? void 0 : err.statusCode;
        message = err === null || err === void 0 ? void 0 : err.message;
        errorSources = [
            {
                path: "",
                message: err === null || err === void 0 ? void 0 : err.message,
            },
        ];
    }
    else if (err instanceof Error) {
        message = err === null || err === void 0 ? void 0 : err.message;
        errorSources = [
            {
                path: "",
                message: err === null || err === void 0 ? void 0 : err.message,
            },
        ];
    }
    return res.status(statusCode).json({
        success: false,
        message,
        errorSources,
        err,
        stack: err === null || err === void 0 ? void 0 : err.stack,
    });
};
exports.default = globalErrorHandler;
