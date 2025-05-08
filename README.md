# 💸 지갑지켜진기스 ⛔
**Vue 기반 가계부 웹 서비스**  

---

## 📚 목차

-  [📝 프로젝트 소개](#-프로젝트-소개)
-  [🔍 실행 방법](#-실행-방법)
-  [⏳ Revision History](#-revision-history)
-  [📸 버전별 구현 결과](#-버전별-구현-결과)
-  [👨‍👩‍👧‍👦 팀 소개](#-팀-소개)
-  [👥 역할 분담 상세](#-역할-분담-상세)
-  [🛠 사용 기술](#-사용-기술)
-  [🛠 Git & 협업 컨벤션](#-git--협업-컨벤션)

---

## 📝 프로젝트 소개
>**지갑지켜진기스**는 사용자의 자산, 지출, 예산을 한눈에 관리할 수 있는 **가계부 웹 애플리케이션**입니다.  
Vue와 json-server를 활용하여 **SPA 기반의 실제 서비스처럼 작동하는 프로토타입**을 구현하였으며,  
데이터 시각화를 통해 자산의 흐름을 효과적으로 파악할 수 있도록 설계되었습니다.

### 🎯 목표
- Vue 기초부터 Composition API까지 실전 활용 능력 향상
- 서비스 개발 시 거치게 되는 기획,설계, 코딩, 테스트 각 단계를 실제 경험
  프로그램 소스의 형상 관리 기법 배양
- 팀 프로젝트 진행 시 팀원 간의 협력 및 충돌 시 조정 과정 경험

---

## 🔍 실행 방법

#### 📌 Requirements
- [Node.js 20.13.1](https://nodejs.org/en/)
- [Npm 10.5.2](https://www.npmjs.com/)
- [json-server](https://github.com/typicode/json-server)

#### 📌 Installation & Run

`git clone https://github.com/JGStudy/MoneyDefenseJGS`

`cd MoneyDefenseJGS/MoneyDefenseJGS`

`npm install`

#### 📌 Frontend 실행

`npm run dev`

#### 📌 Mock API 서버(json-server) 실행

`npx json-server public/db/db.json --watch --port 3000`

---

## ⏳ Revision History

| Version | 구현 기간 | 내용 |
|------|------|-----|
| v1.0.1 | 2025.04.12 - 2025.05.07 | 코드 구조 정리 및 리팩토링 진행 (컴포넌트 분리, 파일 구조 개선 등) |
| v1.0.0 | 2025.04.07 - 2025.04.11 | 가계부 기능 기획, UI 설계, 프로젝트 골격 구성 |

### v1.0.0 진행 일정
| 날짜 | 내용 |
|------|------|
| 4월 7일 | 가계부 기능 기획, UI 설계, 프로젝트 골격 구성 |
| 4월 8일 | 기초 구현, 데이터 json 구조 설계 |
| 4월 9일 - 10일 | 주요 기능 구현 (홈,거래 내역 리스트 및 달력, 자산/지출 관리, 데이터 시각화, 프로필 설정 등) |
| 4월 11일 | 구현 마무리, 문서화 및 Git 정리, 발표 준비 |

---

## 📸 버전별 구현 결과

### v1.0.0

| 📌 온보딩 | 📌 홈 → 거래 기록 | 📌 거래 등록 |
|-------------|----------------|----------------|
| <img src="https://github.com/user-attachments/assets/cdd7aea3-8521-40ac-a125-5ec7059a48c3" width="250" alt="온보딩"/> | <img src="https://github.com/user-attachments/assets/de96b13b-af25-4923-b1eb-f05d078d618e" width="250" alt="거래 기록"/> | <img src="https://github.com/user-attachments/assets/73d428c6-5473-480e-b78c-68236dab556d" width="250" alt="거래 등록"/> |

| 📌 자산 확인, 수정 | 📌 예산 확인, 수정 |
|-------------|----------------|
| <img src="https://github.com/user-attachments/assets/da18629d-95f3-4ab2-8990-b8c377fbadc9" width="250" alt="자산 확인, 수정"/> | <img src="https://github.com/user-attachments/assets/54357807-53db-49e2-9061-d2c9f632e374" width="250" alt="예산 확인, 수정"/> |

| 📌 대시보드 | 📌 설정 |
|-------------|----------------|
| <img src="https://github.com/user-attachments/assets/0d5e89b6-a529-43ad-a0b0-262dfddd835a" width="250" alt="대시보드"/> | <img src="https://github.com/user-attachments/assets/8cd952a2-94b8-4b5a-881b-af305607ce80" width="250" alt="설정"/> |

---

## 👨‍👩‍👧‍👦 팀 소개

### 진짜 기깔난 스터디 (진기스)
> 가계부 웹 서비스 프로젝트를 함께한 진기스 팀원들을 소개합니다.
>
| 이름 | 구현 기능 (페이지) | GitHub |
|------|------|--------|
| 🥊김윤지 [팀장] | 거래 내역 페이지 - 리스트 보기 | [@kkamisister](https://github.com/kkamisister) |
| 🐰김려린 | 대시보드 분석 페이지 | [@ryeorin](https://github.com/ryeorin) |
| 🔧김하연 | 홈 메인 대시보드 페이지 | [@rlaxhfn](https://github.com/rlaxhfn) |
| 🥕사윤민 | 거래 내역 페이지 - 달력 보기 | [@saym010116](https://github.com/saym010116) |
| 🐶유상은 | 자산/예산 관리 페이지 | [@sangeune](https://github.com/sangeune) |
| 🦕조혜련 | 프로필 설정 페이지 | [@HyeEmpathyDev](https://github.com/HyeEmpathyDev) |
| 🕊️황선주 | 거래 등록 페이지 | [@seonju21](https://github.com/seonju21) |
---

## 👥 역할 분담 상세

>### 🐰 김려린
<details>
  <summary>1. 대시보드 (분석 페이지) 구현</summary>

사용자의 자산 흐름을 한눈에 파악할 수 있도록 직관적이고 시각화된 대시보드를 구성

- **월별 요약 정보**  
  - 총 지출, 총 수익, 순자산을 월별로 요약하여 보여주는 카드 UI 구현  
  - 순자산은 수익과 지출 데이터를 기반으로 실시간 계산되도록 설정

- **월별 수입/지출 차트**  
  - 월별 수입과 지출 데이터를 시각적으로 보여주는 막대 그래프(bar chart) 구현  
  - 데이터를 기반으로 동적으로 갱신되도록 구성

- **지출 카테고리 분석**  
  - 카테고리별 지출 비중을 한눈에 볼 수 있도록 pie chart 구현  
  - 사용자 맞춤형 자산 소비 패턴 분석에 용이

</details>


<details>
  <summary>2. 404 에러 페이지 구현</summary>

비정상적인 URL 접근 시, 사용자 친화적인 에러 핸들링을 위해 404 페이지를 별도 구성

- 잘못된 경로 접근 시 404 페이지로 자동 이동  
- "이전 페이지로 돌아가기", "홈으로 이동" 버튼 제공으로 사용자 UX 고려

</details>

<details>
  <summary>3. db.json 구성 및 API 시뮬레이션</summary>

각 페이지에서 사용할 수 있도록 구조화된 데이터를 `db.json`에 작성

- `json-server`와 연동하여 실제 API처럼 작동하는 개발 환경 구축  
- `GET`, `POST`, `PATCH`, `DELETE` 등 RESTful API 방식으로 데이터 테스트 가능  
- 개발 초기 단계에서 백엔드 없이도 UI 개발 및 테스트 가능하도록 설정

</details>

  

>### 🥊 김윤지
<details>
  <summary>1. 거래 내역 리스트 기능 개발</summary>

- `TransactionPage.vue`를 중심으로 거래 내역 리스트 전체 레이아웃과 구성 요소를 설계 및 구현  
- `TransactionList.vue`, `TransactionListItem.vue` 컴포넌트를 생성하여 실제 데이터를 바탕으로 리스트 형태로 시각화  
- 거래 항목별로 날짜, 금액, 카테고리 등의 정보를 구조화하여 사용자 친화적인 정보 전달 가능하도록 구성

</details>

<details>
  <summary>2. 공통 컴포넌트 설계 및 플로팅 버튼 개발</summary>

- 프로젝트 전반에서 재사용 가능한 `BaseButton.vue`, `BaseBox.vue` 등 공통 UI 컴포넌트 직접 설계 및 구현  
- `AddButton.vue` 플로팅 버튼을 제작하여 사용자가 언제든지 거래를 빠르게 추가할 수 있도록 UX 개선  
- 조건부 렌더링(`v-if`)을 통해 특정 페이지에서만 버튼이 표시되도록 구현 → UI 요소의 불필요한 중복 방지

</details>

<details>
  <summary>3. 스타일링 및 UI/UX 개선</summary>

- `TransactionListItem.vue`의 UI 요소를 Tailwind CSS 기반으로 커스터마이징하여, 일관되고 정돈된 디자인 가이드라인 수립  
- 텍스트 간격, 색상, 그림자 등 디테일한 스타일 요소 조정을 통해 가독성과 시각적 완성도 향상

</details>



>### 🔧 김하연
<details>
  <summary>1. 온보딩 페이지 구현</summary>

- 쿠키 여부 확인 후 미설정 시 온보딩 페이지로 리다이렉트  
  - 쿠키가 있을 시 홈(메인) 페이지로 이동  
- 입력값 유효성 검사  
  - 사용자 이름(2~20자) 및 자산 필수 입력  
  - 조건 만족 시 버튼 활성화 (클릭 or 엔터로 진행)

</details>

<details>
  <summary>2. 홈(메인) 페이지 구현</summary>

- 온보딩에서 받은 사용자 이름으로 웰컴 메시지 출력  
- 총 자산 및 지출 내역 요약 보드 구성  
  - 지출 내역: 이번 달 기준, 초기 3개만 보여주고 **‘더보기’**로 확장  
  - 자산 및 지출 내역은 전월 대비 증감 표시  
- 보드 순서 편집 기능 구현

</details>

<details>
  <summary>3. 서비스 기본 레이아웃 컴포넌트 구현</summary>

- 공통 헤더: 페이지 조건에 따라 커스터마이징 가능  
- 공통 하단바: 입력폼이 있을 경우 숨김 처리

</details>

<details>
  <summary>4. Tailwind 디자인 커스텀 세팅 및 구현</summary>

- 스타일 가이드에 맞춰 `tailwind.config.js` 작성  
- 와이어프레임에 맞춰 디자인 구현

</details>


>### 🥕 사윤민
<details>
  <summary>1. 가계부 페이지 컴포넌트 정리 및 통합</summary>

- `Calendar`, `TransactionList` 등 각 컴포넌트를 정리 및 재배치  
- 가계부 페이지 탭 전환 기능 구현  
- **내역 / 달력** 탭 버튼 클릭 시 화면 전환

</details>

<details>
  <summary>2. 가계부 페이지 달력 화면 구현</summary>

- `v-calendar` 라이브러리 활용  
- 날짜 클릭 시 상세 화면을 표시하는 `CalendarModal` 호출

</details>

<details>
  <summary>3. 거래내역 필터링 및 금액 표시</summary>

- `CalendarFilter` 컴포넌트 구현: **지출 / 수입 / 이체** 토글 필터  
- `MonthNavigation` 컴포넌트 구현: **이전 / 다음 달** 월 이동 기능

</details>



>### 🐶 유상은
<details>
  <summary>1. 자산 페이지</summary>

- `총 자산`, `오늘 날짜`, `수정 버튼` 포함한 상단 정보 표시  
- `Chart.js`를 활용해 자산 추이(line chart) 시각화  
- 자산 수정 버튼 클릭 시 자산 편집 페이지로 라우팅 처리

</details>

<details>
  <summary>2. 예산 페이지</summary>

- 한 달 예산, 남은 예산, 하루 예산 정보 계산 및 표시  
- 게이지 바(`GaugeBar.vue`)를 통해 지출 비율 시각화  
- 예산 수정 버튼 클릭 시 예산 편집 페이지로 라우팅 처리

</details>

<details>
  <summary>3. 탭 UI 구현</summary>

- `TabSwitch.vue` 컴포넌트를 사용하여 `총 자산` / `예산` 탭 전환 UI 구현

</details>



>### 🦕 조혜련
<details>
  <summary>1. 설정 페이지 라우팅 및 항목 구성</summary>

- `Header.vue`의 설정 버튼 클릭 시 `SettingsPage.vue`로 이동  
- `ListItem.vue`를 기반으로 설정 항목 리스트 구현  
- 각 항목 클릭 시 `SideModal.vue`를 통해 모달 오픈

</details>

<details>
  <summary>2. 사용자 정보 수정 기능</summary>

- `UserEditPage.vue`에서 닉네임 수정 및 저장 버튼 클릭 시 `PUT /Profile/:id` 요청  
- `PUT` 방식으로 기존 리소스를 덮어쓰기 때문에 `id`, `name` 전체 전송  
- 저장 이후 `userStore.user.name`을 갱신하여 앱 전체에 반영

</details>

<details>
  <summary>3. 데이터 초기화 및 CSV 내보내기</summary>

- 앱의 JSON 데이터(`db.json`)를 초기 상태로 리셋 또는 삭제  
- `/transactions` 데이터를 CSV로 변환해 다운로드 제공 기능 구현

</details>

<details>
  <summary>4. 사용자 피드백 처리</summary>

- 저장 성공/실패 여부에 따라 `SettingToast.vue`를 통해 토스트 메시지 제공

</details>



>### 🕊️ 황선주
<details>
  <summary>1. 거래 등록 (`TransactionCreatePage.vue`)</summary>

- 분류(**수입 / 지출 / 이체**) 선택 시, 카테고리 동적으로 변경 (`computed`)  
- **결제수단**은 `수입`일 경우 숨김 처리 (`v-if`)  
- 카테고리 / 결제수단 드롭다운: `ref + v-if`를 사용하여 토글 및 선택 처리  
- 거래 정보 상태 관리는 `Pinia` 스토어 (`useTransactionStore`)를 통해 전역 관리  
- 날짜, 메모 등 입력 필드는 `v-model`로 바인딩

</details>

<details>
  <summary>2. 금액 입력 기능</summary>

- `input` 필드에서 숫자만 허용  
- 입력 시: 자동 **3자리 콤마 삽입**, 자동 **'원' 단위** 표시  
- 금액 미입력 시: “1원 이상 입력하세요” 경고 메시지 출력

</details>

<details>
  <summary>3. 저장 전 이탈 방지</summary>

- `beforeRouteLeave` 훅을 사용하여  
  입력 값이 있는 상태에서 페이지를 벗어나려 할 경우 **확인 모달 표시**

</details>

<details>
  <summary>4. 필수값 검증</summary>

- **금액, 거래처, 분류, 카테고리, 결제수단** 미입력 시 저장 불가  
- 저장 버튼 동작 전 `validateForm()` 등의 함수로 필드 검증 로직 실행

</details>



---

## 🛠 사용 기술
- **Vue 3** (Composition API)
- **axios**
- **Pinia** (상태관리)
- **Vue Router**
- **Chart.js** (차트 시각화)
- **json-server**
- **Tailwind Css** (슬라이드 팝업)
- **node.js**


---

## 🛠 Git & 협업 컨벤션

### 📌 Git 협업 전략

> 원활한 협업을 위한 브랜치 동기화 및 병합 전략

1. **로컬 `feature` → 원격 `feature` 최신화**
2. **원격 `develop` → 로컬 `develop` 최신화**
3. **로컬 `develop` → 로컬 `feature` 병합 (충돌 여부 확인)**
4. **병합 및 충돌 해결 후 → 원격 `feature`에 반영**
5. **최종적으로 원격 `feature` → 원격 `develop`에 PR 생성**
6. **PR approve 후 `develop`에 병합**

---

### 📌 Commit Message  

**형식**: `키워드: 커밋 메시지 내용` 

예시: 
- `Fix: 회원가입 시 비밀번호 정규식 오류 해결`

| 키워드 | 설명 |
|--------|------|
| **Feat** | 새로운 기능 추가 |
| **Fix** | 버그 수정 |
| **Refactor** | 코드 리팩토링 |
| **Design** | CSS 등 UI/UX 디자인 변경 |
| **Comment** | 주석 추가/수정 |
| **Docs** | 문서 관련 작업 (README 등) |
| **Init** | 초기 설정 및 구성 |
| **Rename** | 파일/폴더명 변경 |
| **Remove** | 파일 삭제 |

---

### 📌 Branch 
`feature/{issue-number}-{작업내용}`

예시:  
```
feature/1-dashboard-ui  
feature/2-popup-cookie
```

---

### 📌 Pull Request Template 

```
### [#이슈번호] 기능 구현 제목

## 개요
- 무엇을, 왜 수정했는지 설명해주세요.

## PR 유형
- [ ] 새로운 기능 추가
- [ ] 버그 수정
- [ ] CSS 등 사용자 UI 디자인 변경
- [ ] 코드 리팩토링
- [ ] 코드에 영향 없는 수정
- [ ] 문서 수정
- [ ] 테스트 추가/리팩토링
- [ ] 빌드/패키지 관련
- [ ] 파일/폴더명 수정
- [ ] 파일 삭제

## PR Checklist
- [ ] 커밋 메시지 컨벤션을 지켰나요?
- [ ] 기능 테스트를 완료했나요?
- [ ] develop 브랜치로 머지 요청했나요?
```

---


### 📌 Label 
```
- name: '🐛 bugfix'
  color: 'd73a4a'
  description: '버그 픽스'

- name: '✨ feature'
  color: '0E8A16'
  description: '새로운 기능 추가'

- name: '🔁 refactor'
  color: 'c2e0c6'
  description: '리팩토링 작업'

- name: '📄 documentation'
  color: '0075ca'
  description: '문서 관련 작업'

- name: '💬 question'
  color: 'd876e3'
  description: '논의/질문'

- name: '🎨 design'
  color: 'ffb3c6'
  description: 'UI/UX 관련 작업'

- name: '🧪 test'
  color: 'f9d0c4'
  description: '테스트 코드 또는 테스트 관련 작업'
```

---

