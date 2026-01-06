import styled from "styled-components";

const US = styled.div`
  width: 80%;
  margin: 0 auto;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  h2 {
    font-size: 26px;
    text-align: center;
    margin-bottom: 30px;
    @media screen and (max-width: 460px) {
      font-size: 20px;
    }
  }
  video {
    display: block;
    margin-bottom: 30px;
  }
  > p {
    text-align: center;
    font-size: 16px;
    margin-bottom: 20px;
    font-weight: 700;
    width: 100%;
    &:nth-of-type(1),
    &:nth-of-type(2) {
      padding: 6px;
      background-color: #000;
      color: #fff;
      border-radius: 6px;
      font-size: 15px;
    }
    &:nth-of-type(3) {
      span {
        font-size: 24px;
        display: inline;
      }
    }
    &:nth-of-type(3) {
      line-height: 1.8;
    }
    &:nth-of-type(2),
    &:nth-of-type(3) {
      @media screen and (max-width: 400px) {
        font-size: 15px;
      }
    }
    @media screen and (max-width: 600px) {
      font-size: 15px;
      &:nth-of-type(1) {
        font-size: 14px;
      }
      &:nth-of-type(3) {
        span {
          font-size: 22px;
        }
      }
    }
  }
  > img[alt="family"] {
    margin-bottom: 30px;
    max-width: 130%;
  }
  > img[alt="mark"] {
    width: 120px;
    margin-bottom: 30px;
    @media screen and (max-width: 560px) {
      width: 100px;
    }
  }
  .discount-badge {
    position: relative;
    width: 130px;
    height: 130px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    font-weight: 700;
    text-align: center;
    background: linear-gradient(135deg, #ff6b6b 0%, #ff8787 100%);
    border-radius: 50%;
    color: #fff;
    line-height: 1.4;
    box-shadow: 0 4px 12px rgba(255, 107, 107, 0.3);
    margin-bottom: 30px;
    @media screen and (max-width: 560px) {
      width: 110px;
      height: 110px;
      font-size: 13px;
    }
  }
  .back-img {
    width: 120px;
    height: 120px;
    object-fit: cover;
    border-radius: 8px;
    margin-bottom: 20px;
    @media screen and (max-width: 560px) {
      width: 100px;
      height: 100px;
    }
  }
`;

const UseContact = () => {
  return (
    <US>
      <img src="/mark2.png" alt="mark" />
      <p>홈케어 닥터 겸 담당 매니저 준디</p>
      <img src="/back.png" alt="back" className="back-img" />
      <div className="discount-badge">
        12개월
        <br />
        반값할인
      </div>
      <p>코웨이 생활가전 제품</p>
      <p>렌탈료 최대 12개월 반값할인 행사중!</p>
      <p>
        정수기 공기청정기, 의류 스타일러, 제습기 <br />
        비데, 연수기, 인덕션, 쇼파, 에어컨, 안마의자 <br />
        똑똑한 소비자가 되자! <br /> 상담 방문 시 친절상담 해 드립니다!{" "}
        <span>😄</span> <br />
        상담 방문 시 똑똑한 소비자로 만들어 드립니다! 😄
      </p>
      <video autoPlay muted loop playsInline style={{ marginBottom: "200px", width: "100%", borderRadius: "8px" }}>
        <source src="/market_video3.mp4" type="video/mp4" />
      </video>
    </US>
  );
};

export default UseContact;
