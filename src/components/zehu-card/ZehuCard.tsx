import styled from "styled-components";

const ZC = styled.div`
  width: 100%;
  height: 250px;
  position: relative;
  background-color: #f3f4f6;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  p {
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto 0;
    left: 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-family: "PyeojinGothic", sans-serif !important;
    span {
      &:nth-child(1) {
        font-weight: 700;
        font-size: 20px;
        display: block;
        margin-bottom: 16px;
      }
      &:nth-child(2) {
        font-size: 18px;
        font-weight: 300;
        b {
          color: #14aafe;
        }
        strong {
          color: red;
          display: block;
          margin-top: 16px;
        }
      }
    }
    @media screen and (max-width: 600px) {
      span {
        &:nth-child(1) {
          font-size: 18px;
        }
        &:nth-child(2) {
          font-size: 16px;
        }
      }
    }
    @media screen and (max-width: 520px) {
      span {
        &:nth-child(1) {
          font-size: 16px;
        }
        &:nth-child(2) {
          font-size: 14px;
        }
      }
    }

    @media screen and (max-width: 480px) {
      left: 30px;
    }

    @media screen and (max-width: 390px) {
      pan {
        &:nth-child(1) {
          font-size: 15px;
        }
        &:nth-child(2) {
          font-size: 12px;
        }
      }
    }
  }
`;

const ZehuCard = () => {
  return (
    <ZC>
      <p>
        <span>코웨이 라이프 솔루션 신한카드</span>
        <span>
          더 합리적인 라이프솔루션을 위한 <br />
          최대 <b>월 3만원</b>의 청구 할인 혜택 <br />
          <strong>제휴카드 결합시 정수기 1,900원 부터~</strong>
        </span>
      </p>
      <img src={"/card.png"} alt="card" />
    </ZC>
  );
};

export default ZehuCard;
