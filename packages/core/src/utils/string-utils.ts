export const StringUtils = {
  /**
   * 문자열의 첫 글자만 대문자로 변환합니다.
   * @param value 변환할 문자열
   * @returns 첫 글자가 대문자인 문자열, 입력이 빈 문자열이면 빈 문자열 반환
   */
  capitalizeFirstLetter(value: string): string {
    if (!value) return '';
    return value.charAt(0).toUpperCase() + value.slice(1);
  },
};
