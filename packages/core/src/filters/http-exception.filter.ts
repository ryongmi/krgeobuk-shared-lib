import { ExceptionFilter, Catch, ArgumentsHost, HttpException, Logger } from '@nestjs/common';
import { Request, Response } from 'express';

import { CoreCode } from '../codes/index.js';
import { CoreMessage } from '../messages/index.js';

type ErrorResponse =
  | string
  | {
      statusCode?: number;
      message: string | string[];
      code?: string;
    };

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse() as ErrorResponse;

    const url = request.url;
    const method = request.method;
    const queryParams = JSON.stringify(request.query);
    const routeParams = JSON.stringify(request.params);
    const requestBody = method !== 'GET' ? JSON.stringify(request.body) : null;
    const sessionUserId = request?.jwt?.id ?? 'UNKNOWN_USER';
    const sessionUser = request?.user?.name ?? 'UNKNOWN_USER';

    // Chrome DevTools 관련 요청은 무시
    if (url.includes('.well-known/appspecific/com.chrome.devtools')) {
      response.status(404).send();
      return;
    }

    // 기본 응답 구조 설정
    let code: string = CoreCode.SERVER_ERROR;
    let message: string = CoreMessage.SERVER_ERROR;

    if (typeof exceptionResponse === 'string') {
      message = exceptionResponse;
    } else {
      message = Array.isArray(exceptionResponse.message)
        ? exceptionResponse.message.join(', ')
        : exceptionResponse.message;
      code = exceptionResponse.code ?? code;
    }

    // ✅ 로그 출력
    const log = [
      `[${method}] ${url}`,
      `Status: ${status}`,
      `Code: ${code}`,
      `Message: ${message}`,
      `UserId: ${sessionUserId}`,
      `UserName: ${sessionUser}`,
      `Query: ${queryParams}`,
      `Params: ${routeParams}`,
    ];

    if (requestBody) log.push(`Body: ${requestBody}`);

    this.logger.error(log.join('\n'));

    // ✅ 응답 전송
    response.status(status).json({
      statusCode: status,
      code,
      message,
    });
  }
}

// import { ExceptionFilter, Catch, ArgumentsHost, HttpException, Logger } from '@nestjs/common';

// @Catch(HttpException)
// export class HttpExceptionFilter implements ExceptionFilter {
//   private readonly logger = new Logger(HttpExceptionFilter.name);

//   catch(exception: HttpException, host: ArgumentsHost): void {
//     const ctx = host.switchToHttp();
//     const response = ctx.getResponse();

//     const request = ctx.getRequest();
//     const { method, url, query, params, body, session } = request;
//     const queryParams = JSON.stringify(query);
//     const routeParams = JSON.stringify(params);
//     const requestBody = method !== 'GET' ? JSON.stringify(body) : null;

//     const status = exception.getStatus();
//     const error = exception.getResponse() as
//       | string
//       | { error: string; statusCode: number; message: string[] };

//     // Chrome DevTools 관련 요청은 로깅하지 않음
//     if (request.url.includes('.well-known/appspecific/com.chrome.devtools')) {
//       return response.status(404).send();
//     }

//     let logMessage = `${method} ${url} ${status} \nException Message: ${exception.message}`;

//     if (typeof error === 'string') {
//       logMessage += `\nResponse  Message: ${error}`;
//     } else {
//       logMessage += `\nResponse  Message: ${error.message}`;
//     }

//     logMessage += `\nSession User: ${session?.user?.id ?? null} \nQuery Params: ${queryParams} \nRoute Params: ${routeParams}`;
//     if (requestBody) {
//       logMessage += ` \nBody: ${requestBody}`;
//     }

//     this.logger.error('logMessage', logMessage);
//     this.logger.error('error', error);

//     response.status(status).json({
//       statusCode: status,
//       error: exception.message || 'Bad Request',
//       message: (typeof error === 'string' ? error : error.message) || 'Invalid input data',
//       // timestamp: new Date().toISOString(),
//       // path: url,
//     });

//     // response.status(status).json({
//     //   status: 'error',
//     //   message: exception.message,
//     //   error: {
//     //     code: status,
//     //     details: exception.getResponse(),
//     //   },
//     // });
//   }
// }
