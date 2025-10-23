// 백엔드 SMS 프록시 서버 (Node.js + Express)
// IP 제한 문제를 해결하기 위한 백엔드 서버

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const crypto = require("crypto");

const app = express();
const PORT = process.env.PORT || 3001;

// CORS 설정 - 더 포괄적인 설정
const corsOptions = {
  origin: function (origin, callback) {
    // 허용된 도메인 목록
    const allowedOrigins = [
      "https://coway-danguen.netlify.app",
      "http://localhost:5173",
      "http://localhost:3000",
      "http://localhost:5174",
      "http://localhost:4173", // Vite preview
      "https://localhost:5173", // HTTPS localhost
    ];

    // origin이 없거나 허용된 목록에 있으면 허용
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log("CORS blocked origin:", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 200,
};

// 미들웨어
app.use(cors(corsOptions));
app.use(express.json());

// OPTIONS 요청을 명시적으로 처리
app.options("*", cors(corsOptions));

// SMS API OPTIONS 요청 처리
app.options("/api/send-sms", (req, res) => {
  const origin = req.headers.origin;
  const allowedOrigins = [
    "https://coway-danguen.netlify.app",
    "http://localhost:5173",
    "http://localhost:3000",
    "http://localhost:5174",
    "http://localhost:4173",
    "https://localhost:5173",
  ];

  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  } else {
    res.header("Access-Control-Allow-Origin", "*");
  }
  res.header("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  res.status(200).end();
});

// 솔라피 API 설정 (실제 키로 변경하세요)
// 실제 솔라피 API 키 설정
const SOLAPI_KEY = process.env.SOLAPI_KEY; // 실제 16자리 키로 변경
const SOLAPI_SECRET = process.env.SOLAPI_SECRET; // 실제 시크릿 키로 변경
const SOLAPI_SENDER = process.env.SOLAPI_SENDER; // 실제 발신번호로 변경

// 실제 키인지 확인 (환경 변수가 설정되어 있으면 실제 키로 인식)
const isRealKey =
  SOLAPI_KEY &&
  SOLAPI_KEY !== "YOUR_REAL_16_DIGIT_KEY" &&
  SOLAPI_KEY.length === 16;
console.log("실제 키 사용:", isRealKey);
console.log("API 키 길이:", SOLAPI_KEY ? SOLAPI_KEY.length : 0);

// 환경 변수 확인
console.log("솔라피 API 설정:");
console.log("API Key:", SOLAPI_KEY.substring(0, 10) + "...");
console.log("Sender:", SOLAPI_SENDER);

// HMAC-SHA256 서명 생성 함수
function generateSignature(apiSecret, message) {
  return crypto.createHmac("sha256", apiSecret).update(message).digest("hex");
}

// SMS 전송 API 엔드포인트
app.post("/api/send-sms", async (req, res) => {
  // CORS 헤더 명시적 설정 - Vercel 호환
  const origin = req.headers.origin;
  const allowedOrigins = [
    "https://coway-danguen.netlify.app",
    "http://localhost:5173",
    "http://localhost:3000",
    "http://localhost:5174",
    "http://localhost:4173",
    "https://localhost:5173",
  ];

  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  } else {
    res.header("Access-Control-Allow-Origin", "*");
  }
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  try {
    const { name, phone, product, day, message } = req.body;

    console.log("SMS 전송 요청 받음:", { name, phone, product, day });
    console.log("📱 수신번호 확인:", phone);

    // 테스트 모드: 실제 SMS 전송 대신 성공 응답 반환
    const isTestMode = false; // 실제 키로 강제 전송 모드

    if (isTestMode) {
      // 테스트 모드: 성공 응답 반환
      console.log("테스트 모드: SMS 전송 시뮬레이션");
      console.log("📱 실제 문자를 받으려면 솔라피 API 키를 설정하세요!");

      const responseData = {
        success: true,
        message: "SMS 전송 성공 (테스트 모드)",
        data: {
          messageId: "test_" + Date.now(),
          to: "01063348324",
          from: SOLAPI_SENDER,
          text: message,
          status: "sent",
        },
      };

      console.log("응답 데이터:", JSON.stringify(responseData, null, 2));
      res.json(responseData);
      return;
    }

    // 실제 솔라피 API 호출 (실제 키가 설정된 경우)
    const timestamp = new Date().toISOString();
    const salt = crypto.randomBytes(16).toString("hex");
    const messageToSign = timestamp + salt;
    const signature = generateSignature(SOLAPI_SECRET, messageToSign);

    // 전화번호에서 하이픈 제거
    const cleanPhone = phone.replace(/-/g, "");
    console.log("📱 정리된 전화번호:", cleanPhone);

    // 01063348324에서 사용자 입력 번호로 문자 발송
    const senderPhone = SOLAPI_SENDER; // 01063348324 (고정 발신번호)
    const receiverPhone = cleanPhone; // 사용자 입력 번호 (수신번호)
    console.log("📱 발신번호:", senderPhone);
    console.log("📱 수신번호:", receiverPhone);
    console.log("📱 사용자 입력 번호:", cleanPhone);

    const payload = {
      message: {
        to: receiverPhone, // 사용자 입력 번호 (수신)
        from: senderPhone, // 01063348324 (발신)
        text: message,
      },
    };

    console.log("📤 솔라피 API 페이로드:", JSON.stringify(payload, null, 2));

    const solapiResponse = await fetch(
      "https://api.solapi.com/messages/v4/send",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `HMAC-SHA256 apiKey=${SOLAPI_KEY}, date=${timestamp}, salt=${salt}, signature=${signature}`,
        },
        body: JSON.stringify(payload),
      }
    );

    const solapiData = await solapiResponse.json();
    console.log("솔라피 API 응답:", JSON.stringify(solapiData, null, 2));

    if (solapiResponse.ok && solapiData.statusCode === "2000") {
      const responseData = {
        success: true,
        message: "SMS 전송 성공",
        data: solapiData,
      };
      console.log("성공 응답 데이터:", JSON.stringify(responseData, null, 2));
      res.json(responseData);
    } else {
      const errorResponse = {
        success: false,
        message: "SMS 전송 실패",
        error: solapiData,
      };
      console.log("실패 응답 데이터:", JSON.stringify(errorResponse, null, 2));
      res.status(400).json(errorResponse);
    }
  } catch (error) {
    console.error("SMS 전송 오류:", error);
    res.status(500).json({
      success: false,
      message: "서버 오류",
      error: error.message,
    });
  }
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`SMS 프록시 서버가 포트 ${PORT}에서 실행 중입니다.`);
  console.log("CORS 설정:");
  console.log("- 허용된 도메인:", [
    "https://coway-danguen.netlify.app",
    "http://localhost:5173",
    "http://localhost:3000",
    "http://localhost:5174",
    "http://localhost:4173",
    "https://localhost:5173",
  ]);
});

module.exports = app;
