import { BaseError, InternalServerError } from "../errors/CustomErrors.js";

function sendError(res, customError) {
      res.status(customError.statusCode).json({ error: {name: customError.name, message: customError.message}});            
}

export default function errorHandlingMidleware(err, req, res, next) {
      if(err) {
            if(err instanceof BaseError) {
                  sendError(res, err);
                  return;
            }

            console.log(err);
            sendError(res, new InternalServerError('Неизвестная внутренняя ошибка сервера'));
            return;
      }
}