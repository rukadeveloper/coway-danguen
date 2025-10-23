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
      font-size: 16px;
      margin-bottom: 10px;
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
        font-size: 15px;
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

  const disabled = !selectedDigital || !name || !phone || !agreeChecked;

  const kakaoConsult = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <TopperInput>
      <form onSubmit={kakaoConsult}>
        <h1>
          * 신용불량자는 렌탈이 제한되며, <br /> 일시불로 구매 가능합니다!
        </h1>
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
          상담신청하기
        </button>
      </form>
    </TopperInput>
  );
};

export default TopInput;
