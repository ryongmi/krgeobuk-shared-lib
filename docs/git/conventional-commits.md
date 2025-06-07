정한 커밋 메시지 형식을 사용해 코드 변경 사항을 **명확하게 기록하고**,

**자동 changelog 생성**이나 **버전 관리, CI/CD 자동화**를 용이하게 합니다.

---

## ✅ 커밋 메시지 형식

```

<type>(optional scope): <description>

[optional body]

[optional footer]

```

### 예

```

feat(user): 로그인 기능 추가
fix(auth): 토큰 갱신 버그 수정

```

---

## 🏷️ 주요 커밋 타입 (type)

| 타입       | 설명                                         |
| ---------- | -------------------------------------------- |
| `feat`     | ✨ 새로운 기능 추가                          |
| `fix`      | 🐛 버그 수정                                 |
| `docs`     | 📝 문서 변경 (코드 수정 없음)                |
| `style`    | 🎨 코드 스타일 변경 (포맷팅, 세미콜론 등)    |
| `refactor` | ♻️ 리팩토링 (기능 변경 없음)                 |
| `perf`     | ⚡️ 성능 개선                                |
| `test`     | ✅ 테스트 코드 추가/수정                     |
| `build`    | 🛠️ 빌드 시스템 또는 의존성 설정 변경         |
| `ci`       | ⚙️ CI 설정 파일 변경                         |
| `chore`    | 🔧 기타 변경사항 (패키지 정리, 설정 파일 등) |
| `revert`   | ⏪ 커밋 되돌리기                             |

---

## 📦 Scope (선택)

- 괄호 안에 해당 변경의 **영역(모듈/도메인 등)**을 명시합니다.
- 예: `feat(auth):`, `fix(database):`

---

## 🧪 사용 예시

```bash

git commit -m "feat(user): 회원가입 API 추가"
git commit -m "fix(database): soft delete 누락된 엔티티 수정"
git commit -m "refactor(user): 불필요한 validation 제거"
git commit -m "style: Prettier 적용"

```

---

## 🧰 도구 추천

- **Commitizen**: 커밋 메시지를 프롬프트 기반으로 작성
- **Husky + lint-staged**: 커밋 전에 메시지 검사 및 포맷팅

```bash

# Commitizen 설치
pnpm add -D commitizen
npx commitizen init cz-conventional-changelog --save-dev --save-exact

```

---

## 📘 참고 링크

- [Conventional Commits 공식 문서](https://www.conventionalcommits.org/)
- Semantic Release (자동 배포)
