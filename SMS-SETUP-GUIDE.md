# SMS 전송 IP 제한 문제 해결 가이드

## 문제 상황

솔라피 API에서 "허용되지 않은 IP로 접근하고 있습니다" 오류가 발생하는 경우의 해결 방법들입니다.

## 해결 방법들

### 1. 솔라피 대시보드에서 IP 제한 해제 (가장 간단)

1. **솔라피 계정 로그인**

   - https://solapi.com/ 접속
   - 계정 로그인

2. **API 설정 변경**

   - 대시보드 → **API 설정** → **IP 제한** 메뉴
   - **IP 제한 해제** 또는 **모든 IP 허용** 선택
   - 설정 저장

3. **현재 IP 추가 (선택사항)**
   - 현재 IP 확인: https://whatismyipaddress.com/
   - **IP 추가** 버튼으로 현재 IP 등록

### 2. 백엔드 프록시 서버 사용 (권장)

#### 2-1. 백엔드 서버 설정

```bash
# 백엔드 서버 폴더 생성
mkdir sms-backend
cd sms-backend

# package.json 복사
cp ../backend-package.json ./package.json

# 의존성 설치
npm install

# 환경 변수 설정
cp ../backend.env.example .env
# .env 파일에서 실제 솔라피 API 키 입력

# 서버 실행
npm start
```

#### 2-2. 프론트엔드 설정

```javascript
// TopInput.tsx에서
const smsMethod = "backend"; // "direct" → "backend"로 변경

// 환경 변수 추가 (.env 파일)
VITE_BACKEND_URL=http://localhost:3001
```

#### 2-3. 백엔드 서버 코드 (이미 생성됨)

- `backend-sms-proxy.js`: Express 서버
- `backend-package.json`: 의존성 설정
- `backend.env.example`: 환경 변수 예제

### 3. 다른 SMS 서비스 사용

#### 3-1. 쿨SMS 사용

```javascript
const smsMethod = "alternative"; // 대안 서비스 사용
```

#### 3-2. 알리고리즘(Aligo) 사용

```javascript
// 코드에서 알리고리즘 API로 변경
const apiKey = "your_aligo_api_key";
const userId = "your_aligo_user_id";
```

### 4. 클라우드 서비스 배포 (프로덕션)

#### 4-1. Vercel 배포

```bash
# Vercel CLI 설치
npm i -g vercel

# 프로젝트 배포
vercel

# 환경 변수 설정
vercel env add SOLAPI_KEY
vercel env add SOLAPI_SECRET
```

#### 4-2. Heroku 배포

```bash
# Heroku CLI 설치 후
heroku create your-sms-proxy
heroku config:set SOLAPI_KEY=your_key
heroku config:set SOLAPI_SECRET=your_secret
git push heroku main
```

## 현재 구현된 기능

### SMS 전송 방법 선택

```javascript
const smsMethod = "backend"; // "direct", "backend", "alternative"
```

- **"direct"**: 솔라피 API 직접 호출 (IP 제한 있을 수 있음)
- **"backend"**: 백엔드 프록시 사용 (IP 제한 해결)
- **"alternative"**: 대안 서비스 사용

### 환경 변수 설정

```env
# 프론트엔드 (.env)
VITE_BACKEND_URL=http://localhost:3001

# 백엔드 (backend.env)
SOLAPI_KEY=your_actual_key
SOLAPI_SECRET=your_actual_secret
SOLAPI_SENDER=01012345678
```

## 추천 해결 순서

1. **개발 단계**: 백엔드 프록시 사용 (`smsMethod = "backend"`)
2. **프로덕션**: 클라우드 서비스에 백엔드 배포
3. **대안**: 솔라피 대시보드에서 IP 제한 해제

## 문제 해결 체크리스트

- [ ] 솔라피 계정에서 IP 제한 해제 확인
- [ ] 백엔드 서버 실행 확인 (포트 3001)
- [ ] 환경 변수 올바르게 설정 확인
- [ ] 네트워크 연결 상태 확인
- [ ] API 키 유효성 확인

## 추가 도움이 필요한 경우

1. 솔라피 고객지원: https://solapi.com/support
2. 백엔드 서버 로그 확인
3. 브라우저 개발자 도구 네트워크 탭 확인
