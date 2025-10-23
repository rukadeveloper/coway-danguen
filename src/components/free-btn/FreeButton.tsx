import styled from "styled-components";
import NewInput from "./NewInput";
import { useState } from "react";

const FB = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  button {
    width: 400px;
    margin: 0 auto;
    padding: 1rem 0;
    background-color: #5fc9f2;
    color: #fff;
    border-radius: 6px 6px 0 0;
    position: fixed;
    bottom: 0;
    z-index: 2000001;
    &:nth-of-type(1) {
      bottom: 56px;
    }
    &:disabled {
      &::after {
        content: "";
        position: absolute;
        inset: 0;
        background-color: rgba(0, 0, 0, 0.45);
      }
    }
  }
`;

const FreeButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [nameData, setNameData] = useState("");
  const [phoneData, setPhoneData] = useState({
    phoneOne: "",
    phoneTwo: "",
    phoneThree: "",
  });
  const [isAgreed, setIsAgreed] = useState(false);

  const handleNameData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameData(e.target.value.trim().slice(0, 3));
  };

  const handlePhone1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneData((prev) => ({ ...prev, phoneOne: e.target.value }));
  };

  const handlePhone2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneData((prev) => ({ ...prev, phoneTwo: e.target.value }));
  };

  const handlePhone3 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneData((prev) => ({ ...prev, phoneThree: e.target.value }));
  };

  const handleAgree = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsAgreed(e.target.checked);
  };

  // SMS 전송 함수
  const sendSMS = async () => {
    setIsSubmitting(true);

    try {
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
          free: "무료상담",
        };
        return productMap[content] || content;
      };

      // 요일을 한글로 변환하는 함수
      const getDayName = (day: number | null) => {
        if (day === null) return "미선택";
        const days = ["월", "화", "수", "목", "금", "토", "일"];
        return days[day] || "미선택";
      };

      // 사용자가 입력한 내용을 그대로 사용
      const messageText = `${nameData}님이 상담 신청을 하셨습니다. 전화번호는 ${
        phoneData.phoneOne
      }-${phoneData.phoneTwo}-${
        phoneData.phoneThree
      } 입니다. 상품은 ${getProductName("free")} 이고, 희망일은 ${getDayName(
        null
      )}요일 입니다.`;

      // 메시지 서비스 선택 (SMS 또는 카카오톡)
      const useKakao = false; // true: 카카오톡, false: SMS
      // // true: 백엔드 사용, false: 직접 호출

      let res;
      let data: any;

      if (useKakao) {
        // 카카오톡 알림톡 전송
        res = await fetch(
          "https://sms-backend-56uq7lzp7-rukadevelopers-projects.vercel.app/api/send-kakao",
          {
            method: "POST",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: nameData,
              phone: `${phoneData.phoneOne}-${phoneData.phoneTwo}-${phoneData.phoneThree}`,
              product: "무료상담",
              day: null,
              message: messageText,
            }),
          }
        );

        data = await res.json();
        console.log("백엔드 프록시 응답:", data);
        console.log("HTTP 상태:", res.status);
      }

      if (
        res &&
        "status" in res &&
        res.status === 200 &&
        data &&
        "success" in data &&
        data.success
      ) {
        alert("상담 신청이 완료되었습니다!");
        // 폼 초기화
        setNameData("");
        setPhoneData({
          phoneOne: "",
          phoneTwo: "",
          phoneThree: "",
        });
        setIsAgreed(false);
      } else {
        const errorMessage =
          data && "errorMessage" in data
            ? data.errorMessage
            : "SMS 전송에 실패했습니다.";
        alert(`상담 신청 실패: ${errorMessage}`);
      }
    } catch (error) {
      console.error("SMS 전송 오류:", error);
      alert("상담 신청 중 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FB>
      <button
        onClick={sendSMS}
        disabled={
          !nameData ||
          !phoneData.phoneOne ||
          !phoneData.phoneTwo ||
          !phoneData.phoneThree ||
          !isAgreed ||
          isSubmitting
        }
      >
        {isSubmitting ? "상담 신청 중..." : "상담 신청하기"}
      </button>
      <button
        onClick={() => {
          setIsOpen((prev) => !prev);
        }}
      >
        홈케어 1회 서비스
      </button>
      {isOpen && (
        <NewInput
          nameData={nameData}
          phoneData={phoneData}
          isAgreed={isAgreed}
          handleNameData={handleNameData}
          handlePhone1={handlePhone1}
          handlePhone2={handlePhone2}
          handlePhone3={handlePhone3}
          handleAgree={handleAgree}
        />
      )}
    </FB>
  );
};

export default FreeButton;
