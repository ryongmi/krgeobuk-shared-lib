import { utilities as nestWinstonModuleUtilities, WinstonModuleOptions } from 'nest-winston';
import * as winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

const appName = process.env.APP_NAME || 'DefaultApp';

export const winstonConfig: WinstonModuleOptions = {
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        nestWinstonModuleUtilities.format.nestLike(appName, {
          prettyPrint: true,
        })
      ),
    }),

    new DailyRotateFile({
      filename: 'logs/app-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
      level: 'info',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf((info: winston.Logform.TransformableInfo) => {
          const base = `[${info.timestamp}] [${info.level}]${info.context ? ` [${info.context}]` : ''} ${info.message}`;
          const stack = info.stack
            ? '\n' + (typeof info.stack === 'object' ? JSON.stringify(info.stack) : info.stack)
            : '';
          return base + stack;
        })
      ),
    }),

    new DailyRotateFile({
      filename: 'logs/error-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '10m',
      maxFiles: '30d',
      level: 'error',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf((info: winston.Logform.TransformableInfo) => {
          const base = `[${info.timestamp}] [${info.level}]${info.context ? ` [${info.context}]` : ''} ${info.message}`;
          const stack = info.stack
            ? '\n' + (typeof info.stack === 'object' ? JSON.stringify(info.stack) : info.stack)
            : '';
          return base + stack;
        })
      ),
    }),
  ],
};
