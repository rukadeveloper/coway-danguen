import styled from "styled-components";
import EnterInput from "./EnterInput";
import { useState } from "react";
import Agree from "./Agree";
import SelectDay from "./SelectDay";

const TopperInput = styled.div`
  width: 500px;
  padding: 60px;
  border-radius: 30px;
  margin-bottom: 10px;
  background-image: linear-gradient(to bottom, #10a7e0 0%, #095b7a 100%);
  form {
    > h1 {
      color: #fff;
      font-size: 19px;
      margin-bottom: 20px;
      text-align: center;
      br {
        display: none;
      }
    }
    > button {
      margin-top: 20px;
      width: 100%;
      background-color: #5fc9f2;
      padding: 0.9rem 0;
      border-radius: 10px;
    }
  }

  @media (max-width: 500px) {
    width: 360px;
    padding: 30px;
    form {
      > h1 {
        font-size: 17px;
        br {
          display: block;
        }
      }
    }
  }
`;

const TopInput = () => {
  const [selectedDigital, setSelectedDigital] = useState({
    content: "coway",
    index: 0,
    isOpen: false,
  });

  const [name, setName] = useState("");

  const [phone, setPhone] = useState({
    phone1: "",
    phone2: "",
    phone3: "",
  });

  const [agreeChecked, setAgreeChecked] = useState(false);

  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const disabled =
    !selectedDigital || !name || !phone || !agreeChecked || isSubmitting;

  const kakaoConsult = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 요일을 한글로 변환하는 함수
      const getDayName = (day: number | null) => {
        if (day === null) return "미선택";
        const days = ["월", "화", "수", "목", "금", "토", "일"];
        return days[day] || "미선택";
      };

      // 상품명을 한글로 변환하는 함수
      const getProductName = (content: string) => {
        const productMap: { [key: string]: string } = {
          coway: "코웨이",
          air: "공기청정기",
          cloth: "의류 청정기",
          vide: "비데",
          yeonsoo: "연수기",
          induction: "인덕션",
          chair: "안마의자",
        };
        return productMap[content] || content;
      };

      // 사용자가 입력한 내용을 그대로 사용
      const messageText = `${name}님이 상담 신청을 하셨습니다. 전화번호는 ${
        phone.phone1
      }-${phone.phone2}-${phone.phone3} 입니다. 상품은 ${getProductName(
        selectedDigital.content
      )} 이고, 희망일은 ${getDayName(selectedDay)}요일 입니다.`;

      // 메시지 서비스 선택 (SMS 또는 카카오톡)
      const useKakao = false; // true: 카카오톡, false: SMS
      const useBackend = true; // true: 백엔드 사용, false: 직접 호출

      let res;
      let data;

      // SMS 전송 방법에 따른 분기 처리
      if (!useBackend) {
        // 솔라피(SolAPI) 직접 호출 - 한국 SMS 서비스
        const apiKey = import.meta.env.VITE_SOLAPI_KEY || "your_solapi_key";
        const apiSecret =
          import.meta.env.VITE_SOLAPI_SECRET || "your_solapi_secret";
        const sender = import.meta.env.VITE_SOLAPI_SENDER || "01012345678";

        // 솔라피 API를 위한 기본 인증 (더 간단한 방식)
        const timestamp = new Date().toISOString();
        const salt = Math.random().toString(36).substring(2, 15);

        // 솔라피 정확한 HMAC-SHA256 서명 생성
        const message = timestamp + salt;
        const key = await crypto.subtle.importKey(
          "raw",
          new TextEncoder().encode(apiSecret),
          { name: "HMAC", hash: "SHA-256" },
          false,
          ["sign"]
        );

        const signature = await crypto.subtle.sign(
          "HMAC",
          key,
          new TextEncoder().encode(message)
        );
        const signatureHex = Array.from(new Uint8Array(signature))
          .map((b) => b.toString(16).padStart(2, "0"))
          .join("");

        const payload = {
          message: {
            to: "01057900593", // 수신자 번호
            from: sender, // 발신번호
            text: messageText,
          },
        };

        res = await fetch("https://api.solapi.com/messages/v4/send", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `HMAC-SHA256 apiKey=${apiKey}, date=${timestamp}, salt=${salt}, signature=${signatureHex}`,
          },
          body: JSON.stringify(payload),
        });

        data = await res.json();
      } else if (useKakao) {
        // 카카오톡 알림톡 전송
        const backendUrl =
          "https://sms-backend-56uq7lzp7-rukadevelopers-projects.vercel.app";

        const payload = {
          name,
          phone: `${phone.phone1}-${phone.phone2}-${phone.phone3}`,
          product: selectedDigital.content,
          day: selectedDay,
          message: messageText,
        };

        res = await fetch(`${backendUrl}/api/send-kakao`, {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        data = await res.json();
        console.log("카카오톡 API 응답:", data);
      } else {
        // 백엔드 프록시를 통한 SMS 전송 (IP 제한 해결)
        const backendUrl =
          "https://sms-backend-56uq7lzp7-rukadevelopers-projects.vercel.app";

        const payload = {
          name,
          phone: `${phone.phone1}-${phone.phone2}-${phone.phone3}`,
          product: selectedDigital.content,
          day: selectedDay,
          message: messageText,
        };

        res = await fetch(`${backendUrl}/api/send-sms`, {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        data = await res.json();
      }

      // 디버깅을 위한 로그 추가
      if (!useBackend && res && data) {
        console.log("솔라피 API 응답:", data);
        if ("status" in res) {
          console.log("HTTP 상태:", res.status);
        }
        if ("headers" in res) {
          console.log(
            "응답 헤더:",
            Object.fromEntries((res.headers as Headers).entries())
          );
        }

        // IP 제한 오류 처리
        if (
          "errorCode" in data &&
          data.errorCode === "Forbidden" &&
          "errorMessage" in data &&
          typeof data.errorMessage === "string" &&
          data.errorMessage.includes("IP")
        ) {
          console.error("IP 제한 오류:", data.errorMessage);
          alert(
            "SMS 서비스 접근 권한이 제한되어 있습니다. 관리자에게 문의해주세요."
          );
          return;
        }
      } else if (useBackend) {
        console.log("백엔드 프록시 응답:", data);
        if ("status" in res) {
          console.log("HTTP 상태:", res.status);
        }
      } else {
        console.log("대안 서비스 응답:", data);
      }

      if (res?.ok && data?.success) {
        alert("상담 신청이 완료되었습니다! 빠른 시일 내에 연락드리겠습니다.");
        // 폼 초기화
        setName("");
        setPhone({ phone1: "", phone2: "", phone3: "" });
        setSelectedDigital({ content: "coway", index: 0, isOpen: false });
        setSelectedDay(null);
        setAgreeChecked(false);
      } else {
        alert("상담 신청 중 오류가 발생했습니다. 다시 시도해주세요.");
        console.error("SMS 전송 실패:", data);
      }
    } catch (error) {
      alert("상담 신청 중 오류가 발생했습니다. 다시 시도해주세요.");
      console.error("SMS 전송 오류:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <TopperInput>
      <form onSubmit={kakaoConsult}>
        <h1>신용불량자는 렌탈이 제한됩니다.</h1>
        <EnterInput
          label="성함"
          type="text"
          forId="nameId"
          inputState={name}
          setInputState={setName}
        />
        <EnterInput
          label="전화번호"
          type="text"
          forId="phoneId"
          isLength
          phoneState={phone}
          setPhoneState={setPhone}
        />
        <EnterInput
          label="전자제품"
          type="combo_box"
          forId="comboId"
          combo_array={[
            "정수기_32종 상담/coway",
            "업소용 정수기/coway_company",
            "얼음 정수기/coway_ice",
            "침대 매트리스/matrix",
            "공기청정기/air",
            "의류 청정기/cloth",
            "비데/vide",
            "연수기/yeonsoo",
            "인덕션/induction",
            "안마의자/chair",
          ]}
          state={selectedDigital}
          setState={setSelectedDigital}
        />
        <SelectDay day={selectedDay} setDay={setSelectedDay} />
        <Agree agree={agreeChecked} setAgree={setAgreeChecked} />
        <button type="submit" disabled={disabled}>
          {isSubmitting ? "전송 중..." : "상담 신청하기"}
        </button>
      </form>
    </TopperInput>
  );
};

export default TopInput;
