import { ZodError, ZodIssue } from "zod";
import { TGenericResponseError } from "../interface/error";

const handleZodError = (err: ZodError): TGenericResponseError => {
  const errorSource = err.issues.map((issue: ZodIssue) => {
    return {
      path: issue.path.join(".") || "",
      message: issue.message,
    };
  });
  return {
    statusCode: 400,
    message: "Validation error",
    errorSource,
  };
};

export default handleZodError;
