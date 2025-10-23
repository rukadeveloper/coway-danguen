import styled from "styled-components";
import AgreeBox from "../top-input/AgreeBox";
import { useState } from "react";

const NI = styled.div`
  width: 100%;
  max-width: 600px;
  height: 550px;
  background-image: linear-gradient(to bottom, #10a7e0 0%, #095b7a 100%);
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2000000;
  padding: 0 20px;
  padding-top: 20px;
  border-radius: 20px 20px 0 0;
  box-shadow: 0 -10px 30px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    width: 100%;
    max-width: 100%;
    left: 0;
    transform: none;
    padding: 0 15px;
    padding-top: 15px;
    border-radius: 15px 15px 0 0;
  }

  span.title {
    font-size: 14px;
    color: #fff;
    display: block;
    margin-bottom: 1.4rem;
    text-align: center;
    font-weight: 500;

    @media (max-width: 768px) {
      font-size: 13px;
      margin-bottom: 1rem;
    }
  }

  .nameId {
    display: flex;
    align-items: center;
    margin-bottom: 15px;

    @media (max-width: 768px) {
      flex-direction: column;
      align-items: flex-start;
      margin-bottom: 12px;
    }

    input {
      width: 80%;
      padding: 12px 15px;
      background-color: #fff;
      border-radius: 8px;
      border: none;
      font-size: 14px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

      @media (max-width: 768px) {
        width: 100%;
        padding: 14px 15px;
        font-size: 16px;
      }

      &:focus {
        outline: none;
        box-shadow: 0 0 0 3px rgba(16, 167, 224, 0.3);
      }
    }
    label {
      flex: 1;
      color: #fff;
      font-weight: 600;
      font-size: 14px;

      @media (max-width: 768px) {
        margin-bottom: 8px;
        font-size: 15px;
      }
    }
  }

  .phoneId {
    display: flex;
    align-items: center;
    margin-bottom: 15px;

    @media (max-width: 768px) {
      flex-direction: column;
      align-items: flex-start;
      margin-bottom: 12px;
    }

    label {
      flex: 1;
      color: #fff;
      font-weight: 600;
      font-size: 14px;

      @media (max-width: 768px) {
        margin-bottom: 8px;
        font-size: 15px;
      }
    }
    .phone-group {
      width: 80%;
      display: flex;
      align-items: center;
      gap: 8px;

      @media (max-width: 768px) {
        width: 100%;
        gap: 4px;
        flex-wrap: nowrap;
      }

      span {
        display: flex;
        width: 10px;
        justify-content: center;
        align-items: center;
        color: #fff;
        font-weight: bold;

        @media (max-width: 768px) {
          width: 8px;
        }
      }
      input {
        flex: 1;
        padding: 12px 8px;
        background-color: #fff;
        border-radius: 8px;
        border: none;
        font-size: 14px;
        text-align: center;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        min-width: 0;

        @media (max-width: 768px) {
          padding: 12px 4px;
          font-size: 14px;
          min-width: 0;
        }

        &:focus {
          outline: none;
          box-shadow: 0 0 0 3px rgba(16, 167, 224, 0.3);
        }
      }
    }
  }

  .agrees {
    margin-bottom: 20px;

    @media (max-width: 768px) {
      margin-bottom: 15px;
    }

    label {
      display: flex;
      align-items: center;
      gap: 10px;
      color: #fff;
      font-size: 14px;
      cursor: pointer;

      @media (max-width: 768px) {
        font-size: 15px;
        gap: 12px;
      }

      input[type="checkbox"] {
        width: 18px;
        height: 18px;
        accent-color: #10a7e0;

        @media (max-width: 768px) {
          width: 20px;
          height: 20px;
        }
      }
    }
  }

  button {
    width: 100%;
    padding: 16px;
    background: linear-gradient(135deg, #fff 0%, #f8f9fa 100%);
    color: #10a7e0;
    border: none;
    border-radius: 12px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    margin-top: 20px;

    @media (max-width: 768px) {
      padding: 18px;
      font-size: 17px;
      border-radius: 10px;
      margin-top: 15px;
    }

    &:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
      background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
    }

    &:active:not(:disabled) {
      transform: translateY(0);
    }

    &:disabled {
      background: #ccc;
      color: #666;
      cursor: not-allowed;
      transform: none;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
  }
`;

const NewInput = ({
  nameData,
  phoneData,
  isAgreed,
  handleNameData,
  handlePhone1,
  handlePhone2,
  handlePhone3,
  handleAgree,
}: {
  nameData: string;
  phoneData: { phoneOne: string; phoneTwo: string; phoneThree: string };
  isAgreed: boolean;
  handleNameData: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePhone1: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePhone2: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePhone3: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleAgree: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  const [_, setIsSubmitting] = useState(false);

  // SMS 전송 함수
  const sendSMS = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
      const useBackend = true; // true: 백엔드 사용, false: 직접 호출

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
        handleNameData({
          target: { value: "" },
        } as React.ChangeEvent<HTMLInputElement>);
        handlePhone1({
          target: { value: "" },
        } as React.ChangeEvent<HTMLInputElement>);
        handlePhone2({
          target: { value: "" },
        } as React.ChangeEvent<HTMLInputElement>);
        handlePhone3({
          target: { value: "" },
        } as React.ChangeEvent<HTMLInputElement>);
        handleAgree({
          target: { checked: false },
        } as React.ChangeEvent<HTMLInputElement>);
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
    <NI>
      <form onSubmit={sendSMS}>
        <span className="title">
          * 신용불량자는 렌탈이 제한되며,일시불로 구매 가능합니다!
        </span>
        <div className="nameId">
          <label htmlFor="nameId">성함</label>
          <input
            type="text"
            value={nameData}
            onChange={handleNameData}
            required
          />
        </div>
        <div className="phoneId">
          <label htmlFor="phoneId1">전화번호</label>
          <div className="phone-group">
            <input
              type="text"
              value={phoneData.phoneOne}
              onChange={handlePhone1}
              required
            />
            <span>-</span>
            <input
              type="text"
              value={phoneData.phoneTwo}
              onChange={handlePhone2}
              required
            />
            <span>-</span>
            <input
              type="text"
              value={phoneData.phoneThree}
              onChange={handlePhone3}
              required
            />
          </div>
        </div>
        <div className="agrees">
          <label htmlFor="agreeId">
            <input
              type="checkbox"
              id="agreeId"
              checked={isAgreed}
              onChange={handleAgree}
              required
            />
            <span>개인 정보 처리 방침 동의</span>
          </label>
        </div>
        <AgreeBox />
      </form>
    </NI>
  );
};

export default NewInput;
