import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, catchError, concatMap, finalize, from } from 'rxjs';
import { DataSource } from 'typeorm';

@Injectable()
export class TransactionInterceptor<T> implements NestInterceptor<T, T> {
  constructor(private readonly dataSource: DataSource) {}

  intercept(context: ExecutionContext, next: CallHandler<T>): Observable<T> {
    const request = context.switchToHttp().getRequest();
    const queryRunner = this.dataSource.createQueryRunner();

    // RxJS 연산자에서 비동기 작업 처리 위해 from() 사용
    const startTransaction$ = from(
      (async (): Promise<void> => {
        await queryRunner.connect();
        await queryRunner.startTransaction();
        request.queryRunnerManager = queryRunner.manager;
      })()
    );

    // 트랜잭션 시작을 Observable 체인에 연결
    return startTransaction$.pipe(
      concatMap(() => next.handle()),
      concatMap(data =>
        from(queryRunner.commitTransaction()).pipe(
          // commit 완료 후 원본 데이터 방출
          concatMap(() => [data])
        )
      ),
      catchError((error: unknown) =>
        from(queryRunner.rollbackTransaction()).pipe(
          concatMap(() => {
            throw error;
          })
        )
      ),
      finalize(() => {
        if (!queryRunner.isReleased) {
          queryRunner.release();
        }
      })
    );
  }
}
