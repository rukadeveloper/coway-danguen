import styled from "styled-components";

const AgreesBox = styled.div`
  width: 100%;
  height: 70px;
  background-color: #fff;
  padding: 0.67rem;
  margin-top: 1rem;
  border-radius: 10px;
  p {
    font-size: 13px;
    line-height: 1.9;
    margin-bottom: 1rem;
  }
`;

const AgreeBox = () => {
  return (
    <AgreesBox>
      <p>
        상담 목적으로만 사용되며, <br />
        상담 완료 후 개인정보는 안전하게 파기됩니다.
      </p>
    </AgreesBox>
  );
};

export default AgreeBox;
