import { NotFoundException } from '@nestjs/common';
import { Repository, EntityTarget, SelectQueryBuilder, ObjectLiteral, DataSource } from 'typeorm';

import type { PaginateWithFilterOptions, PaginatedResult } from '@krgeobuk/core/src/interfaces';

export class BaseRepository<T extends ObjectLiteral> extends Repository<T> {
  constructor(entity: EntityTarget<T>, dataSource: DataSource) {
    super(entity, dataSource.createEntityManager());
  }

  // 쿼리 빌더로 복잡한 쿼리 작성
  getQueryBuilder(alias: string): SelectQueryBuilder<T> {
    return this.createQueryBuilder(alias);
  }

  /**
   * ID로 엔티티 하나를 조회합니다.
   * @param id 엔티티 ID
   * @returns 찾은 엔티티
   */
  async exists(where: Partial<T>): Promise<boolean> {
    const count = await this.count({ where });
    return count > 0;
  }

  /**
   * ID로 엔티티 하나를 조회합니다.
   * @param id 엔티티 ID
   * @returns 찾은 엔티티
   */
  async findOneById(id: T['id']): Promise<T | null> {
    return this.findOne({ where: { id } });
  }

  /**
   * ID로 엔티티 하나를 조회합니다.
   * @param id 엔티티 ID
   * @param relations 함께 조회할 테이블 이름 배열
   * @returns 찾은 엔티티
   */
  async findOneByIdWithRelations(id: T['id'], relations: Array<string>): Promise<T | null> {
    return this.findOne({ where: { id }, ...(relations.length ? { relations } : {}) });
    // return this.findOne({ where: { id }, relations });
  }

  /**
   * ID로 엔티티 하나를 조회하고 없으면 예외를 발생시킵니다.
   * @param id 엔티티 ID
   * @returns 찾은 엔티티
   * @throws NotFoundException 엔티티를 찾지 못한 경우
   */
  async findOneByIdOrFail(id: T['id']): Promise<T> {
    const entity = await this.findOneById(id);

    if (!entity) {
      throw new NotFoundException(`${this.metadata.name} with ID ${id} not found`);
    }

    return entity;
  }

  // 사용예시
  //   await userRepository.paginateWithFilter('user', {
  //   page: 1,
  //   limit: 10,
  //   filters: { isActive: true },
  // });
  async paginateWithFilter(
    alias: string,
    options: PaginateWithFilterOptions<T>
  ): Promise<Partial<PaginatedResult<T>>> {
    const { page = 1, limit = 15, filter } = options;
    const qb = this.getQueryBuilder(alias);

    // 필터가 주어졌으면 where 절 동적 추가
    if (filter) {
      Object.entries(filter).forEach(([key, value]) => {
        if (value !== undefined) {
          qb.andWhere(`${alias}.${key} = :${key}`, { [key]: value });
        }
      });
    }

    const [data, total] = await qb
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return { data, total };
  }

  async softDeleteById(id: T['id']): Promise<void> {
    await this.softDelete(id);
  }

  async restoreById(id: T['id']): Promise<void> {
    await this.restore(id);
  }
}
