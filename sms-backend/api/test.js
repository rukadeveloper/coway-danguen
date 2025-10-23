// Vercel 서버리스 함수 - CORS 테스트
module.exports = async (req, res) => {
  // CORS 헤더 설정
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
    res.setHeader("Access-Control-Allow-Origin", origin);
  } else {
    res.setHeader("Access-Control-Allow-Origin", "*");
  }
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  // OPTIONS 요청 처리
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  // 테스트 응답
  res.status(200).json({
    success: true,
    message: "CORS 테스트 성공",
    origin: origin,
    method: req.method,
    timestamp: new Date().toISOString(),
  });
};
