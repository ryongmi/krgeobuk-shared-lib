import type { NaverGenderType } from '../../enum/index.js';

export interface NaverUserProfileResponse {
  id: string;
  email: string;
  nickname: string;
  profileImage: string;
  age: string;
  gender: NaverGenderType;
  name: string;
  birthday: string;
  birthyear: string;
  mobile: string;
}

// {
//     "id": "32742776",
//     "email": "openapi@naver.com",
//     "nickname": "OpenAPI",
//     "profile_image": "https://ssl.pstatic.net/static/pwe/address/nodata_33x33.gif",
//     "age": "40-49",
//     "gender": "F",
//     "name": "오픈 API",
//     "birthday": "10-01",
//     "birthyear": "1900",
//     "mobile": "010-0000-0000"
//  }
