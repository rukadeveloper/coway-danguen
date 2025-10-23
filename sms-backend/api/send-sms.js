// Vercel 서버리스 함수로 SMS 전송 API
const crypto = require("crypto");

// CORS 헤더 설정 함수
const setCorsHeaders = (res, origin) => {
  const allowedOrigins = [
    "https://coway-danguen.netlify.app",
    "http://localhost:5173",
    "http://localhost:3000",
    "http://localhost:5174",
    "http://localhost:4173",
    "https://localhost:5173",
  ];

  // 모든 Origin 허용 (개발 단계에서)
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Requested-With, Accept, Origin"
  );
  res.setHeader("Access-Control-Allow-Credentials", "false"); // * 사용 시 false
  res.setHeader("Access-Control-Max-Age", "86400"); // 24시간

  // 추가 CORS 헤더
  res.setHeader("Access-Control-Expose-Headers", "Content-Length, X-JSON");
  res.setHeader("Vary", "Origin");
};

// HMAC-SHA256 서명 생성 함수
function generateSignature(apiSecret, message) {
  return crypto.createHmac("sha256", apiSecret).update(message).digest("hex");
}

module.exports = async (req, res) => {
  // CORS 헤더 설정
  setCorsHeaders(res, req.headers.origin);

  // OPTIONS 요청 처리 (Preflight)
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  // POST 요청만 허용
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const { name, phone, product, day, message } = req.body;

    // 상품명을 한글로 변환하는 함수
    const getProductName = (content) => {
      const productMap = {
        coway: "코웨이",
        air: "공기청정기",
        cloth: "의류 청정기",
        vide: "비데",
        yeonsoo: "연수기",
        induction: "인덕션",
        chair: "안마의자",
        free: "무료상담",
        무료상담: "무료상담",
      };
      return productMap[content] || content;
    };

    // 요일을 한글로 변환하는 함수
    const getDayName = (day) => {
      if (day === null || day === undefined) return "미선택";
      const days = ["월", "화", "수", "목", "금", "토", "일"];
      return days[day] || "미선택";
    };

    console.log("SMS 전송 요청 받음:", { name, phone, product, day });
    console.log("📱 수신번호 확인:", phone);
    console.log("🛍️ 상품명 변환:", product, "→", getProductName(product));

    // 환경 변수에서 API 키 가져오기
    const SOLAPI_KEY = process.env.SOLAPI_KEY;
    const SOLAPI_SECRET = process.env.SOLAPI_SECRET;
    const SOLAPI_SENDER = process.env.SOLAPI_SENDER;

    console.log("환경 변수 확인:");
    console.log("SOLAPI_KEY:", SOLAPI_KEY ? "설정됨" : "설정되지 않음");
    console.log("SOLAPI_SECRET:", SOLAPI_SECRET ? "설정됨" : "설정되지 않음");
    console.log("SOLAPI_SENDER:", SOLAPI_SENDER ? "설정됨" : "설정되지 않음");

    if (!SOLAPI_KEY || !SOLAPI_SECRET || !SOLAPI_SENDER) {
      console.error("환경 변수가 설정되지 않았습니다.");
      console.error("SOLAPI_KEY:", SOLAPI_KEY);
      console.error("SOLAPI_SECRET:", SOLAPI_SECRET);
      console.error("SOLAPI_SENDER:", SOLAPI_SENDER);
      return res.status(500).json({
        success: false,
        errorMessage: "서버 설정 오류: API 키가 설정되지 않았습니다.",
        debug: {
          hasKey: !!SOLAPI_KEY,
          hasSecret: !!SOLAPI_SECRET,
          hasSender: !!SOLAPI_SENDER,
        },
      });
    }

    // 솔라피 API 직접 호출
    const timestamp = new Date().toISOString();
    const salt = crypto.randomBytes(16).toString("hex");
    const data = timestamp + salt;
    const signature = generateSignature(SOLAPI_SECRET, data);

    // 한글 상품명과 요일로 메시지 생성
    const koreanProduct = getProductName(product);
    const koreanDay = getDayName(day);
    const koreanMessage = `${name}님이 상담 신청을 하셨습니다. 전화번호는 ${phone} 입니다. 상품은 ${koreanProduct} 이고, 희망일은 ${koreanDay}요일 입니다.`;

    const solapiPayload = {
      message: {
        to: phone.replace(/-/g, ""), // 하이픈 제거
        from: SOLAPI_SENDER,
        text: koreanMessage,
      },
    };

    console.log("솔라피 API 페이로드:", JSON.stringify(solapiPayload, null, 2));

    const solapiResponse = await fetch(
      "https://api.solapi.com/messages/v4/send",
      {
        method: "POST",
        headers: {
          Authorization: `HMAC-SHA256 ApiKey=${SOLAPI_KEY}, Date=${timestamp}, salt=${salt}, signature=${signature}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(solapiPayload),
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
      console.log("✅ SMS 전송 성공:", responseData);
      res.status(200).json(responseData);
    } else {
      const errorMessage =
        solapiData.errorList?.[0]?.reason || "알 수 없는 오류";
      console.error("❌ SMS 전송 실패:", errorMessage);
      res.status(400).json({
        success: false,
        errorMessage: errorMessage,
        details: solapiData,
      });
    }
  } catch (error) {
    console.error("SMS 전송 중 오류 발생:", error);
    res.status(500).json({
      success: false,
      errorMessage: "서버 오류가 발생했습니다.",
      error: error.message,
    });
  }
};
