export class AppError extends Error {
  statusCode: number;
  error: string;

  constructor(message: string, statusCode: number, code?: string) {
    super(message);
    this.statusCode = statusCode || 500;
    this.error = code || 'InternalError';
  }

  static make(error: Error, code?: string) {
    let err = error;
    if (!err) {
      err = InternalError();
    }
    return new AppError(err.message, 400, code || 'BadRequestException');
  }
}

export const InternalError = (message = 'Internal error') => new AppError(message, 500);
export const BadRequestException = (message = 'Bad request') => new AppError(message, 400, 'BadRequestException');
export const NotFoundException = (message = 'Bad request') => new AppError(message, 404, 'NotFoundException');
export const UnauthorizedException = (message = 'Unauthorized') => new AppError(message, 401, 'UnauthorizedException');
export const NotImplementedException = (message = 'Not implemented') =>
  new AppError(message, 400, 'NotImplementedException');
