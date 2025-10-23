import React, { type Dispatch, type SetStateAction } from "react";

import styled from "styled-components";
import Combobox from "./Combobox";

export interface Content {
  content: string;
  index: number;
  isOpen: boolean;
}

const RealInput = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-bottom: 20px;
  label {
    font-size: 16px;
    color: #fff;
    flex: 1;
  }
  > input {
    width: 70%;
    background-color: #fff;
    border: none;
    padding: 0.2rem 0.9rem;
    border-radius: 10px;
    font-size: 0.9rem;
  }
  > div.phone {
    width: 70%;
    input {
      width: calc((100% - 20px) / 3);
      background-color: #fff;
      padding: 0.2rem 0.9rem;
      border-radius: 10px;
      font-size: 0.9rem;
    }
    span {
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
      width: 10px;
    }
  }
  @media screen and (max-width: 500px) {
    flex-direction: column;
    gap: 0.5rem;
    align-items: flex-start;
    > input {
      width: 100%;
    }
    > div.phone {
      width: 100%;
      input {
        flex: 1;
      }
    }
  }
`;

interface Phone {
  phone1: string;
  phone2: string;
  phone3: string;
}

const EnterInput = ({
  label,
  type,
  forId,
  isLength,
  combo_array,
  state,
  setState,
  inputState,
  setInputState,
  phoneState,
  setPhoneState,
}: {
  label: string;
  type: string;
  forId: string;
  isLength?: boolean;
  combo_array?: string[];
  state?: Content;
  setState?: Dispatch<SetStateAction<Content>>;
  inputState?: string;
  setInputState?: Dispatch<SetStateAction<string>>;
  phoneState?: Phone;
  setPhoneState?: Dispatch<SetStateAction<Phone>>;
}) => {
  const handleState = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputState!(e.target.value.trim().slice(0, 3));
  };

  return (
    <RealInput>
      <label htmlFor={forId}>{label}</label>
      {type === "text" && isLength && (
        <div
          style={{ display: "flex", alignItems: "center" }}
          className="phone"
        >
          <input
            type={type}
            id={`${forId} + "_1"`}
            value={phoneState!.phone1}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPhoneState!((prev) => ({
                ...prev,
                phone1: e.target.value.trim().slice(0, 3),
              }))
            }
          />
          <span>-</span>
          <input
            type={type}
            id={`${forId} + "_2"`}
            value={phoneState!.phone2}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPhoneState!((prev) => ({
                ...prev,
                phone2: e.target.value.trim().slice(0, 4),
              }))
            }
          />
          <span>-</span>
          <input
            type={type}
            id={`${forId} + "_3"`}
            value={phoneState!.phone3}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPhoneState!((prev) => ({
                ...prev,
                phone3: e.target.value.trim().slice(0, 4),
              }))
            }
          />
        </div>
      )}
      {type == "text" && !isLength && (
        <input
          type={type}
          id={forId}
          onChange={handleState}
          value={inputState}
        />
      )}
      {type === "combo_box" && (
        <Combobox
          combo_array={combo_array!}
          state={state!}
          setState={setState!}
        />
      )}
    </RealInput>
  );
};

export default EnterInput;
