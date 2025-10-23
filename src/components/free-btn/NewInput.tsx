import styled from "styled-components";

const NI = styled.div`
  width: 600px;
  height: 300px;
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
  > div {
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
    .phone-group {
      width: 80%;
      display: flex;
      span {
        display: flex;
        width: 10px;
        justify-content: center;
        align-items: center;
        color: #fff;
      }
      input {
        width: calc((100% - 20px) / 3);
      }
    }
  }
`;

const NewInput = () => {
  return (
    <NI>
      <span>* 신용불량자는 렌탈이 제한되며,일시불로 구매 가능합니다!</span>
      <div className="nameId">
        <label htmlFor="nameId">성함</label>
        <input type="text" />
      </div>
      <div className="phoneId">
        <label htmlFor="phoneId1">전화번호</label>
        <div className="phone-group">
          <input type="text" />
          <span>-</span>
          <input type="text" />
          <span>-</span>
          <input type="text" />
        </div>
      </div>
    </NI>
  );
};

export default NewInput;
