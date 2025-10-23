import React, { type Dispatch, type SetStateAction } from "react";

import styled from "styled-components";
import AgreeBox from "./AgreeBox";

const AgreeCheck = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  label {
    display: flex;
    align-items: center;
    gap: 0.9rem;
    color: #fff;
  }
  button {
    text-decoration: underline;
    color: #fff;
  }
`;

const Agree = ({
  agree,
  setAgree,
}: {
  agree: boolean;
  setAgree: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <>
      <AgreeCheck>
        <label htmlFor="agree">
          <input
            id="agree"
            type="checkbox"
            checked={agree}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setAgree(e.target.checked);
            }}
          />
          <span>개인 정보 처리 방침 동의</span>
        </label>
      </AgreeCheck>
      <AgreeBox />
    </>
  );
};

export default Agree;
