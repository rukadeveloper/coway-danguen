// 백엔드 SMS 프록시 서버 (Node.js + Express)
// IP 제한 문제를 해결하기 위한 백엔드 서버

const express = require("express");
const cors = require("cors");
const crypto = require("crypto");

const app = express();
const PORT = process.env.PORT || 3001;

// 미들웨어
app.use(cors());
app.use(express.json());

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
  try {
    const { name, phone, product, day, message } = req.body;

    console.log("SMS 전송 요청 받음:", { name, phone, product, day });

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

    const payload = {
      message: {
        to: phone,
        from: SOLAPI_SENDER,
        text: message,
      },
    };

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
});

module.exports = app;
