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

// 솔라피 API 설정 (환경 변수에서 가져오기)
const SOLAPI_KEY = process.env.SOLAPI_KEY || "your_solapi_key";
const SOLAPI_SECRET = process.env.SOLAPI_SECRET || "your_solapi_secret";
const SOLAPI_SENDER = process.env.SOLAPI_SENDER || "01012345678";

// HMAC-SHA256 서명 생성 함수
function generateSignature(apiSecret, message) {
  return crypto.createHmac("sha256", apiSecret).update(message).digest("hex");
}

// SMS 전송 API 엔드포인트
app.post("/api/send-sms", async (req, res) => {
  try {
    const { name, phone, product, day, message } = req.body;

    // 솔라피 API 인증 정보 생성
    const timestamp = new Date().toISOString();
    const salt = crypto.randomBytes(16).toString("hex");
    const messageToSign = timestamp + salt;
    const signature = generateSignature(SOLAPI_SECRET, messageToSign);

    // 솔라피 API 요청 데이터
    const payload = {
      message: {
        to: "01063348324", // 수신자 번호
        from: SOLAPI_SENDER, // 발신번호
        text: message,
      },
    };

    // 솔라피 API 호출
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

    // 응답 처리
    if (solapiResponse.ok && solapiData.success) {
      res.json({
        success: true,
        message: "SMS 전송 성공",
        data: solapiData,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "SMS 전송 실패",
        error: solapiData,
      });
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
