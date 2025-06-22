import { applyDecorators } from '@nestjs/common';
import { ApiExtraModels, ApiResponse, getSchemaPath } from '@nestjs/swagger';
import { ResponseFormatDto, ErrorFormatDto } from '@krgeobuk/core/dtos';
import type { SwaggerApiResponseOptions } from '@krgeobuk/swagger/src/interface';

/**
 *
 * @param status 해당 응답 코드값
 * @param description 해당 응답 설명
 * @param dto 해당 응답 JSON 구조
 * @returns
 */
export const SwaggerApiOkResponse = (param: SwaggerApiResponseOptions): MethodDecorator => {
  const { status, description: description = '', dto } = param;

  if (dto) {
    return applyDecorators(
      ApiExtraModels(ResponseFormatDto, dto),
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
  // if (dto) {
  //   return applyDecorators(
  //     ApiExtraModels(dto),
  //     ApiResponse({
  //       status,
  //       description,
  //       schema: {
  //         type: 'object',
  //         properties: {
  //           statusCode: {
  //             type: 'number',
  //             example: status,
  //             description: '해당 HTTP 코드',
  //           },
  //           isLogin: {
  //             type: 'boolean',
  //             example: false,
  //             description: '로그인 유무',
  //           },
  //           data: { $ref: getSchemaPath(dto) },
  //         },
  //       },
  //     }),
  //   );
  // } else {
  //   return ApiResponse({ status, description });
  // }
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
