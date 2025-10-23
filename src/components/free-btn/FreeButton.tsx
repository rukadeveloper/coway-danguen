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

  return (
    <FB>
      <button disabled={!nameData || !phoneData || !isAgreed}>
        상담 신청하기
      </button>
      <button
        onClick={() => {
          setIsOpen((prev) => !prev);
        }}
      >
        렌탈 & 홈케어 1회 서비스
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
