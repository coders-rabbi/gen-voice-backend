import mongoose from "mongoose";
import { TErrorSource, TGenericResponseError } from "../interface/error";

const handleCastError = (
  err: mongoose.Error.CastError,
): TGenericResponseError => {
  const errorSource: TErrorSource = [
    {
      path: err.path,
      message: err.message,
    },
  ];

  return {
    statusCode: 400,
    message: "Something is given Invalid",
    errorSource,
  };
};

export default handleCastError;
