export class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

export class NotFoundError extends AppError {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = 404;
  }
}

export class BadRequestError extends AppError {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = 400;
  }
}

export class ConflictError extends AppError {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = 409;
  }
}

export class UnauthorizedError extends AppError {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = 401;
  }
}

export class ForbiddenError extends AppError {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = 403;
  }
}
