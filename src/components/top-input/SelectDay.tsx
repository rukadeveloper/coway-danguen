import { type Dispatch, type SetStateAction } from "react";

import styled from "styled-components";

const SD = styled.div`
  display: flex;
  margin-bottom: 20px;
  span {
    font-size: 16px;
    color: #fff;
    flex: 1;
  }

  ul {
    width: 70%;
    display: flex;
    gap: 0.5rem;
    li {
      button {
        padding: 0 10px;
        color: #fff;
        border: 1px solid #fff;
        &.dayOn {
          background-color: #fff;
          color: #000;
        }
      }
    }
  }

  @media screen and (max-width: 500px) {
    flex-direction: column;
    span {
      margin-bottom: 10px;
    }
  }
`;

const SelectDay = ({
  day,
  setDay,
}: {
  day: number | null;
  setDay: Dispatch<SetStateAction<number | null>>;
}) => {
  return (
    <SD>
      <span>요일 선택</span>
      <ul>
        <li>
          <button
            className={`${day === 0 ? "dayOn" : ""}`}
            onClick={() => setDay(0)}
            type="button"
          >
            월
          </button>
        </li>
        <li>
          <button
            className={`${day === 1 ? "dayOn" : ""}`}
            onClick={() => setDay(1)}
            type="button"
          >
            화
          </button>
        </li>
        <li>
          <button
            className={`${day === 2 ? "dayOn" : ""}`}
            onClick={() => setDay(2)}
            type="button"
          >
            수
          </button>
        </li>
        <li>
          <button
            className={`${day === 3 ? "dayOn" : ""}`}
            onClick={() => setDay(3)}
            type="button"
          >
            목
          </button>
        </li>
        <li>
          <button
            className={`${day === 4 ? "dayOn" : ""}`}
            onClick={() => setDay(4)}
            type="button"
          >
            금
          </button>
        </li>
        <li>
          <button
            className={`${day === 5 ? "dayOn" : ""}`}
            onClick={() => setDay(5)}
            type="button"
          >
            토
          </button>
        </li>
        <li>
          <button
            className={`${day === 6 ? "dayOn" : ""}`}
            onClick={() => setDay(6)}
            type="button"
          >
            일
          </button>
        </li>
      </ul>
    </SD>
  );
};

export default SelectDay;
