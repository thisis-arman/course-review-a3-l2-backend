import mongoose from "mongoose";
import { TErrorSources } from "../middleware/globalErrorHandler";

export const handleCastError = (err: mongoose.Error.CastError) => {
  const errorSources: TErrorSources = [
    {
      path: err.path,
      message: err.message,
    },
  ];

  const statusCode = 400;
  return {
    statusCode,
    message: "Cast Error",
    err,
    errorSources,
  };
};
