import mongoose from "mongoose";
import { TErrorSources } from "../middleware/globalErrorHandler";

export const handleValidationError = (err: mongoose.Error.ValidationError) => {
  const errorSources: TErrorSources = Object.values(err.errors).map(
    (value: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: value?.path,
        message: value?.message,
      };
    }
  );
  const statusCode = 200;
  return {
    statusCode,
    message: "Validations Error",
    errorSources,
  };
};
