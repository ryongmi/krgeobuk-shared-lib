import { applyDecorators } from '@nestjs/common';
import { ApiExtraModels, ApiResponse, getSchemaPath } from '@nestjs/swagger';

import {
  ResponseFormatDto,
  PaginateResultBaseDto,
  PaginateResultDto,
  ErrorFormatDto,
} from '@krgeobuk/core/dtos';

import type {
  SwaggerApiResponseOptions,
  SwaggerPaginatedResponseOptions,
} from '../interface/index.js';

/**
 *
 * @param status 해당 응답 코드값
 * @param description 해당 응답 설명
 * @param dto 해당 응답 JSON 구조
 * @returns
 */
export const SwaggerApiOkResponse = (param: SwaggerApiResponseOptions): MethodDecorator => {
  const { status, description: description = '', dto, extraModels = [] } = param;

  if (dto) {
    return applyDecorators(
      ApiExtraModels(ResponseFormatDto, dto, ...extraModels),
      ApiResponse({
        status,
        description,
        schema: {
          allOf: [
            { $ref: getSchemaPath(ResponseFormatDto) },
            {
              properties: {
                data: {
                  $ref: getSchemaPath(dto),
                },
              },
            },
          ],
        },
      })
    );
  } else {
    return ApiResponse({ status, description });
  }
};

export const SwaggerApiPaginatedResponse = (
  param: SwaggerPaginatedResponseOptions
): MethodDecorator => {
  const { status, description = '', dto, extraModels = [] } = param;

  const itemsSchema =
    extraModels.length > 0
      ? {
          oneOf: [
            { $ref: getSchemaPath(dto) },
            ...extraModels.map((model) => ({ $ref: getSchemaPath(model) })),
          ],
        }
      : { $ref: getSchemaPath(dto) };

  return applyDecorators(
    ApiExtraModels(ResponseFormatDto, PaginateResultDto, dto, ...extraModels),
    ApiResponse({
      status,
      description,
      schema: {
        allOf: [
          { $ref: getSchemaPath(ResponseFormatDto) },
          {
            properties: {
              data: {
                allOf: [
                  { $ref: getSchemaPath(PaginateResultDto) },
                  {
                    properties: {
                      items: {
                        type: 'array',
                        items: itemsSchema,
                      },
                    },
                  },
                  {
                    properties: {
                      pageInfo: {
                        type: 'object',
                        items: {
                          $ref: getSchemaPath(PaginateResultBaseDto),
                        },
                      },
                    },
                  },
                ],
              },
            },
          },
        ],
      },
    })
  );
};

/**
 *
 * @param status 해당 응답 코드값
 * @param description 해당 응답 설명
 * @returns
 */
export const SwaggerApiErrorResponse = (param: SwaggerApiResponseOptions): MethodDecorator => {
  const { status, description: description = '' } = param;

  return ApiResponse({
    status,
    description,
    type: ErrorFormatDto,
    // schema: {
    //   type: 'object',
    //   properties: {
    //     statusCode: {
    //       type: 'number',
    //       example: status,
    //       description: '해당 HTTP 코드',
    //     },
    //     error: {
    //       type: 'string',
    //       example: 'Bad Request',
    //       description: '에러발생시 해당 에러종류',
    //     },
    //     message: {
    //       type: 'string',
    //       example: '서버에서 에러가 발생하였습니다.',
    //       description: '에러발생시 해당 에러관련 메세지',
    //     },
    //   },
    // },
  });
};

