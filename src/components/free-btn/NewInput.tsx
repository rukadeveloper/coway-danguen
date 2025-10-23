import styled from "styled-components";
import AgreeBox from "../top-input/AgreeBox";

const NI = styled.div`
  width: 600px;
  height: 500px;
  background-image: linear-gradient(to bottom, #10a7e0 0%, #095b7a 100%);
  position: fixed;
  bottom: 0;
  z-index: 2000000;
  padding: 0 90px;
  padding-top: 20px;
  > span {
    font-size: 14px;
    color: #fff;
    display: block;
    margin-bottom: 1.4rem;
  }
  .nameId {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    input {
      width: 80%;
      padding: 10px 0;
      background-color: #fff;
      border-radius: 6px;
    }
    label {
      flex: 1;
      color: #fff;
    }
  }
  .phoneId {
    display: flex;
    align-items: center;
    label {
      flex: 1;
      color: #fff;
    }
    .phone-group {
      width: 80%;
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      span {
        display: flex;
        width: 10px;
        justify-content: center;
        align-items: center;
        color: #fff;
      }
      input {
        width: calc((100% - 20px) / 3);
        padding: 10px 0;
        background-color: #fff;
        border-radius: 6px;
      }
    }
  }
  .agrees {
    label {
      display: flex;
      align-items: center;
      gap: 10px;
      color: #fff;
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
  return (
    <NI>
      <span>* 신용불량자는 렌탈이 제한되며,일시불로 구매 가능합니다!</span>
      <div className="nameId">
        <label htmlFor="nameId">성함</label>
        <input type="text" value={nameData} onChange={handleNameData} />
      </div>
      <div className="phoneId">
        <label htmlFor="phoneId1">전화번호</label>
        <div className="phone-group">
          <input
            type="text"
            value={phoneData.phoneOne}
            onChange={handlePhone1}
          />
          <span>-</span>
          <input
            type="text"
            value={phoneData.phoneTwo}
            onChange={handlePhone2}
          />
          <span>-</span>
          <input
            type="text"
            value={phoneData.phoneThree}
            onChange={handlePhone3}
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
          />
          <span>개인 정보 처리 방침 동의</span>
        </label>
      </div>
      <AgreeBox />
    </NI>
  );
};

export default NewInput;
