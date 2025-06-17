import { DataSource } from 'typeorm';

// export const TRANSACTION_KEY = 'TRANSACTION';

export function Transaction() {
  return function <T extends { dataSource: DataSource }>(
    _target: T, // 데코레이터가 적용된 클래스의 prototype
    _propertyKey: string | symbol, // 데코레이터가 적용된 메서드의 이름
    descriptor: PropertyDescriptor // 메서드의 속성 설명자
  ): PropertyDescriptor {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: unknown[]): Promise<unknown> {
      const dataSource: DataSource = (this as T).dataSource;
      const queryRunner = dataSource.createQueryRunner();

      await queryRunner.connect();
      await queryRunner.startTransaction();

      try {
        // queryRunner.manager를 마지막 인자로 추가해서 호출
        const result = await originalMethod.apply(this, [...args, queryRunner.manager]);
        await queryRunner.commitTransaction();
        return result;
      } catch (error: unknown) {
        await queryRunner.rollbackTransaction();
        throw error;
      } finally {
        await queryRunner.release();
      }
    };

    return descriptor;
  };
}
