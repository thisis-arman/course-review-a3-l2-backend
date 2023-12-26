/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import { handleZodError } from "../errors/handleZodError";
import { handleCastError } from "../errors/handleCastError";
import {
  handleDuplicate,
  handleDuplicateError,
} from "../errors/handleDuplicateError";
import AppError from "../errors/AppError";

export type TErrorSources = {
  path: string | number;
  message: string;
}[];

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "something went wrong";

  let errorSources: TErrorSources = [
    {
      path: "",
      message: "Something went wrong",
    },
  ];

  if (err instanceof ZodError) {
    const meaningFulError = handleZodError(err);
    console.log({ meaningFulError });
    statusCode = meaningFulError?.statusCode;
    message = meaningFulError.message;
    errorSources = meaningFulError.errorSources;
  } else if (err?.name === "CastError") {
    const meaningFulError = handleCastError(err);
    statusCode = meaningFulError.statusCode;
    message = meaningFulError.message;
    errorSources = meaningFulError.errorSources;
  } else if (err?.code === "11000") {
    const meaningFulError = handleDuplicateError(err);
    statusCode = meaningFulError.statusCode;
    message = meaningFulError.message;
    errorSources = meaningFulError.errorSources;
  } else if (err instanceof AppError) {
    statusCode = err?.statusCode;
    message = err?.message;
    errorSources = [
      {
        path: "",
        message: err?.message,
      },
    ];
  } else if (err instanceof Error) {
    message = err?.message;
    errorSources = [
      {
        path: "",
        message: err?.message,
      },
    ];
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    err,
    stack: err?.stack,
  });
};

export default globalErrorHandler;
