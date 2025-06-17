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

// import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
// import { Observable, catchError, concatMap, finalize } from 'rxjs';
// import { DataSource } from 'typeorm';

// @Injectable()
// export class TransactionInterceptor<T> implements NestInterceptor<T, T> {
//   constructor(private readonly dataSource: DataSource) {}

//   async intercept(context: ExecutionContext, next: CallHandler<T>): Promise<Observable<T>> {
//     // request 객체를 가져옵니다.
//     const request = context.switchToHttp().getRequest();
//     // transaction 시작
//     const queryRunner = this.dataSource.createQueryRunner();
//     await queryRunner.connect();
//     await queryRunner.startTransaction();
//     // attach query manager with transaction to the request
//     request.queryRunnerManager = queryRunner.manager;

//     return next.handle().pipe(
//       // 라우트 핸들러가 성공적으로 완료될 때 concatMap이 호출됩니다.
//       // concatMap을 쓰는 이유
//       // 각각의 비동기 작업이 순차적으로 실행되어야 하기 때문에
//       // concatMap을 사용함, map, switchMap은 사용불가
//       // 예) map을 사용하면 커밋전에 finalize로 넘어가버려 에러 발생함
//       concatMap(async (data: unknown) => {
//         console.log('트랜잭션 완료');
//         await queryRunner.commitTransaction();
//         return data;
//       }),
//       // 라우트 핸들러가 예외를 던질 떄 catchError가 호출됩니다.
//       catchError(async (error: unknown) => {
//         console.log('트랜잭션 중 에러발생');
//         await queryRunner.rollbackTransaction();
//         throw error;
//       }),
//       // 항상 마지막에 실행되는 부분으로 이곳에서 release가 이루어져야 어떠한
//       // 상황에서도 release가 보장됩니다.
//       finalize(async () => {
//         console.log('트랜잭션 해제');
//         if (queryRunner?.isReleased) {
//           await queryRunner.release();
//         }
//       })
//     );
//   }
// }
