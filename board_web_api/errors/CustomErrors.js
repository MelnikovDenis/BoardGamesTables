class BaseError extends Error {
      statusCode;

      constructor(name, message, statusCode) {
            super();

            Object.setPrototypeOf(this, new.target.prototype);
            this.name = name;
            this.message = message;
            this.statusCode = statusCode;

            Error.captureStackTrace(this);
      }
}

class AlreadyExistsError extends BaseError {
      constructor(message) {
            super('ALREADY_EXISTS', message, 400);
      }
}

class NotFoundError extends BaseError {
      constructor(message) {
            super('NOT_FOUND', message, 404);
      }
}

class RequestDataError extends BaseError {
      constructor(message) {
            super('REQUEST_DATA_ERROR', message, 400);
      }
}

class InternalServerError extends BaseError {
      constructor(message) {
            super('INTERNAL_SERVER_ERROR', message, 500);
      }
}

export { 
      BaseError,
      InternalServerError,
      AlreadyExistsError, 
      NotFoundError, 
      RequestDataError
};