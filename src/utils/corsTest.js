// CORS 테스트 유틸리티 함수
export const testCorsConnection = async () => {
  try {
    console.log("🧪 CORS 테스트 시작...");

    const response = await fetch(
      "https://sms-backend-8axaeg8o3-rukadevelopers-projects.vercel.app/api/test",
      {
        method: "GET",
        mode: "cors",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("📡 응답 상태:", response.status);
    console.log(
      "📋 응답 헤더:",
      Object.fromEntries(response.headers.entries())
    );

    const data = await response.json();
    console.log("📦 응답 데이터:", data);

    return { success: true, data };
  } catch (error) {
    console.error("❌ CORS 테스트 실패:", error);
    return { success: false, error: error.message };
  }
};

// SMS API 테스트 함수
export const testSmsApi = async (
  testData = {
    name: "테스트",
    phone: "010-1234-5678",
    product: "무료상담",
    day: null,
    message: "CORS 테스트 메시지",
  }
) => {
  try {
    console.log("📱 SMS API 테스트 시작...");

    const response = await fetch(
      "https://sms-backend-8axaeg8o3-rukadevelopers-projects.vercel.app/api/send-sms",
      {
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(testData),
      }
    );

    console.log("📡 SMS API 응답 상태:", response.status);
    console.log(
      "📋 SMS API 응답 헤더:",
      Object.fromEntries(response.headers.entries())
    );

    const data = await response.json();
    console.log("📦 SMS API 응답 데이터:", data);

    return { success: true, data };
  } catch (error) {
    console.error("❌ SMS API 테스트 실패:", error);
    return { success: false, error: error.message };
  }
};
