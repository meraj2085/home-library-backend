
import mongoose from 'mongoose';
import { IGenericErrorResponse } from '../interface/common';
import { IGenericErrorMessage } from '../interface/error';

const handleCastError = (
  error: mongoose.Error.CastError
): IGenericErrorResponse => {
  const errors: IGenericErrorMessage[] = [
    {
      path: error.path,
      message: 'Invalid Id!',
    },
  ];

  const statusCode = 400;
  return {
    statusCode,
    message: 'Cast Error!',
    errorMessages: errors,
  };
};

export default handleCastError;
