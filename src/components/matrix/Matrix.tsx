import styled from "styled-components";

const MT = styled.div`
  width: 100%;
  h2 {
    text-align: left;
    font-size: 18px;
    padding-left: calc(11.55% / 2);
    text-align: center;
  }
  > p {
    padding-left: calc(11.55% / 2);
    margin-top: 25px;
    line-height: 1.8;
    text-align: center;
  }
  ul {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    padding: 0 calc(11.55% / 2);
    gap: 1.5rem;
    margin-top: 20px;
    li {
      aspect-ratio: 1 / 1;
      position: relative;
      &::after {
        content: "";
        position: absolute;
        inset: 0;
        background-color: rgba(0, 0, 0, 0.45);
      }
      p {
        position: absolute;
        color: #fff;
        bottom: 0;
        left: 0;
        z-index: 10000;
        margin: 0;
        padding: 0;
        padding-bottom: 20px;
        padding-left: 20px;
        font-size: 16px;
        text-align: left;
        font-family: "PyeojinGothic", sans-serif !important;
      }
      &:nth-child(1) {
        background: url("/care_guide_1.png") no-repeat center/cover;
      }
      &:nth-child(2) {
        background: url("/care_guide_2.png") no-repeat center/cover;
      }
      &:nth-child(3) {
        background: url("/care_guide_3.png") no-repeat center/cover;
      }
      &:nth-child(4) {
        background: url("/care_guide_4.png") no-repeat center/cover;
      }
    }
  }
  .video {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 30px;
  }
  @media screen and (max-width: 550px) {
    h2 {
      font-size: 15px;
    }
    > p {
      font-size: 14px;
    }
    ul {
      display: flex;
      flex-direction: column;
      align-items: center;
      li {
        width: 70%;
        p {
          font-size: 14px;
          padding-bottom: 6px;
          padding-left: 6px;
        }
      }
    }
  }
  @media screen and (max-width: 480px) {
    ul {
      li {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        p {
          position: relative;
          padding: 0;
          text-align: center;
        }
      }
    }
  }
  @media screen and (max-width: 460px) {
    h2 {
      font-size: 13px;
    }
    > p {
      font-size: 12px;
    }
  }
`;

const Matrix = () => {
  return (
    <MT>
      <h2>
        홈케어 닥터겸, 담당 매니저 준디만의 <br />
        특별한 혜택 3가지
      </h2>
      <p>
        하나, 상담 방문시 침대 ~ 매트리스 홈케어 <br /> 50,000원권 1회 무료
        서비스
        <br />
        둘, 2개 이상 렌탈시 15%할인 및 <br />
        첫달 렌탈비 현금 지원 (최대 120,000원)
        <br />
        셋, 매트리스 렌탈시 <br />
        고급 방수 커버 선물 증정해 드립니다.
      </p>
      <ul>
        <li>
          <p>
            01. <br />
            위생적이고 <br />
            편안한 수면 환경을 위해서
          </p>
        </li>
        <li>
          <p>
            02. <br />
            매트리스와 프레임의 <br />
            클리닝 & 위싱 서비스와
          </p>
        </li>
        <li>
          <p>
            03. <br />
            전문 장비로 <br />
            오염 장비 측정부터 UV 살균까지
          </p>
        </li>
        <li>
          <p>
            04. <br />
            케어 전문가의 서비스를 통해 <br /> 적정 주기에 맞게 <br />
            체계적인 서비스 관리를 <br /> 받으실 수 있습니다.
          </p>
        </li>
      </ul>
      <div className="video">
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/133J-n4O9TQ?si=vMLfrfsq1oYZEZUn"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>
    </MT>
  );
};

export default Matrix;
