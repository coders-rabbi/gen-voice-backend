import { ErrorRequestHandler } from "express";
import { ZodError, ZodIssue } from "zod";
import { TErrorSource } from "../interface/error";
import config from "../config";
import handleZodError from "../error/handleZodError";
import handleMongooseValidationError from "../error/mongoosValidationError";
import handleCastError from "../error/handleCastError";
import handleDuplicateError from "../error/handleDuplicateError";
import { StatusCodes } from "http-status-codes";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  let message = err.message || "Something went wrong!";

  let errorSource: TErrorSource = [
    {
      path: "",
      message: "Something went wrong!",
    },
  ];

  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSource = simplifiedError.errorSource;
  } else if (err?.name === "ValidationError") {
    const simplifiedError = handleMongooseValidationError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSource = simplifiedError.errorSource;
  } else if (err?.name === "CastError") {
    const simplifiedError = handleCastError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSource = simplifiedError.errorSource;
  } else if (err?.code === 11000) {
    const simplifiedError = handleDuplicateError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSource = simplifiedError.errorSource;
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorSource,
    stack: config.NODE_ENV === "Development" ? err?.stack : null,
  });
};

export default globalErrorHandler;
