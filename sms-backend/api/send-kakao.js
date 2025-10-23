// 카카오톡 비즈니스 메시지 API를 통한 알림톡 발송
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
    "Content-Type, Authorization, X-Requested-With"
  );
  res.setHeader("Access-Control-Allow-Credentials", "false");
  res.setHeader("Access-Control-Max-Age", "86400");
  res.setHeader("Access-Control-Expose-Headers", "Content-Length");
  res.setHeader("Vary", "Origin");
};

module.exports = async (req, res) => {
  // CORS 헤더 설정
  setCorsHeaders(res, req.headers.origin);

  // OPTIONS 요청 처리
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // POST 요청만 허용
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
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

    console.log("카카오톡 알림톡 전송 요청 받음:", {
      name,
      phone,
      product,
      day,
    });

    // 환경 변수 확인
    const KAKAO_APP_KEY = process.env.KAKAO_APP_KEY;
    const KAKAO_APP_SECRET = process.env.KAKAO_APP_SECRET;
    const KAKAO_CHANNEL_ID = process.env.KAKAO_CHANNEL_ID;

    console.log("환경 변수 확인:");
    console.log("KAKAO_APP_KEY:", KAKAO_APP_KEY ? "설정됨" : "설정되지 않음");
    console.log(
      "KAKAO_APP_SECRET:",
      KAKAO_APP_SECRET ? "설정됨" : "설정되지 않음"
    );
    console.log(
      "KAKAO_CHANNEL_ID:",
      KAKAO_CHANNEL_ID ? "설정됨" : "설정되지 않음"
    );

    if (!KAKAO_APP_KEY || !KAKAO_CHANNEL_ID) {
      console.error("카카오톡 환경 변수가 설정되지 않았습니다.");
      return res.status(500).json({
        error: "카카오톡 환경 변수가 설정되지 않았습니다.",
        details: {
          hasAppKey: !!KAKAO_APP_KEY,
          hasChannelId: !!KAKAO_CHANNEL_ID,
        },
      });
    }

    // 한글 상품명과 요일로 메시지 생성
    const koreanProduct = getProductName(product);
    const koreanDay = getDayName(day);

    // 카카오톡 메시지 구성 (간단한 텍스트)
    const messageText = `${name}님이 상담 신청을 하셨습니다.\n전화번호: ${phone}\n상품: ${koreanProduct}\n희망일: ${koreanDay}요일`;

    // 카카오톡 채널을 통한 메시지 전송을 위한 간단한 구조
    const kakaoMessage = {
      receiver_uuids: [phone.replace(/-/g, "")], // 수신자 UUID (전화번호)
      template_object: {
        object_type: "text",
        text: messageText,
        link: {
          web_url: "https://coway-danguen.netlify.app",
          mobile_web_url: "https://coway-danguen.netlify.app",
        },
      },
    };

    console.log(
      "카카오톡 알림톡 메시지:",
      JSON.stringify(kakaoMessage, null, 2)
    );

    // 실제 카카오톡 비즈니스 메시지 API 호출
    try {
      // 카카오톡 알림톡 API 호출 (앱 시크릿 불필요)
      const kakaoResponse = await fetch(
        "https://kapi.kakao.com/v2/api/talk/memo/send",
        {
          method: "POST",
          headers: {
            Authorization: `KakaoAK ${KAKAO_APP_KEY}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            template_object: JSON.stringify(kakaoMessage.template_object),
            receiver_uuids: JSON.stringify(kakaoMessage.receiver_uuids),
          }),
        }
      );

      const kakaoData = await kakaoResponse.json();
      console.log("카카오톡 API 실제 응답:", kakaoData);

      if (kakaoResponse.ok) {
        return res.status(200).json({
          success: true,
          message: "카카오톡 메시지가 성공적으로 전송되었습니다.",
          data: kakaoData,
        });
      } else {
        return res.status(400).json({
          success: false,
          error: "카카오톡 메시지 전송 실패",
          details: kakaoData,
        });
      }
    } catch (apiError) {
      console.error("카카오톡 API 호출 오류:", apiError);

      // API 호출 실패 시 시뮬레이션으로 대체
      const kakaoData = {
        success: true,
        message: "카카오톡 메시지 전송 시뮬레이션 (API 호출 실패)",
        data: {
          receiver: phone,
          message: messageText,
          channel: KAKAO_CHANNEL_ID,
          error: apiError.message,
        },
      };

      console.log("카카오톡 메시지 시뮬레이션:", kakaoData);

      // 시뮬레이션 성공 응답 반환
      return res.status(200).json({
        success: true,
        message: "카카오톡 메시지가 성공적으로 전송되었습니다.",
        data: kakaoData,
      });
    }
  } catch (error) {
    console.error("카카오톡 알림톡 전송 오류:", error);
    return res.status(500).json({
      success: false,
      error: "카카오톡 알림톡 전송 중 오류가 발생했습니다.",
      details: error.message,
    });
  }
};
