import { LoggerService, Injectable } from '@nestjs/common';

const appName = process.env.APP_NAME || 'DefaultApp';

@Injectable()
export class CustomLogger implements LoggerService {
  log(message: string, context?: string): void {
    console.log(`[LOG] ${context ?? appName}: ${message}`);
  }

  error(message: string, trace?: string, context?: string): void {
    console.error(`[ERROR] ${context ?? appName}: ${message}`);
    if (trace) console.error(trace);
  }

  warn(message: string, context?: string): void {
    console.warn(`[WARN] ${context ?? appName}: ${message}`);
  }

  debug?(message: string, context?: string): void {
    console.debug(`[DEBUG] ${context ?? appName}: ${message}`);
  }

  verbose?(message: string, context?: string): void {
    console.info(`[VERBOSE] ${context ?? appName}: ${message}`);
  }

  //   setLogLevels?(levels: LogLevel[]): void {
  //     // 로그 레벨 설정이 필요하다면 여기에 로직 작성
  //   }
}
