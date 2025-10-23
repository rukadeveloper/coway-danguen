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
  }
`;

const FreeButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <FB>
      <button
        onClick={() => {
          setIsOpen(false);
        }}
      >
        무료 상담 신청하기
      </button>
      {isOpen && <NewInput />}
    </FB>
  );
};

export default FreeButton;
