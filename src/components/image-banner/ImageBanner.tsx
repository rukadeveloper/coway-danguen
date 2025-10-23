import styled from "styled-components";

const Banner = styled.div`
  position: relative;
  width: 100%;
  @media screen and (max-width: 390px) {
    &::after {
      content: "";
      position: absolute;
      inset: 0;
      background-color: rgba(0, 0, 0, 0.45);
    }
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  div {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100000;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #fff;
    padding-top: 10px;
    font-family: "PyeojinGothic", sans-serif !important;
    font-weight: 700;
    h2 {
      font-size: 20px;
      margin-bottom: 30px;
    }
    span {
      font-weight: 300;
      &:nth-of-type(1) {
        font-size: 26px;
        font-weight: 700;
      }
    }
    @media screen and (max-width: 580px) {
      h2 {
        font-size: 18px;
        margin-bottom: 20px;
      }
      span {
        &:nth-of-type(1) {
          font-size: 23px;
        }
      }
    }
    @media screen and (max-width: 540px) {
      h2 {
        font-size: 16px;
      }
      span {
        &:nth-of-type(1) {
          font-size: 21px;
        }
      }
    }
    @media screen and (max-width: 460px) {
      h2 {
        font-size: 14px;
      }
      span {
        &:nth-of-type(1) {
          font-size: 19px;
        }
      }
    }
    @media screen and (max-width: 390px) {
      bottom: 0;
      padding: 0;
      margin: auto;
    }
  }
`;

const ImageBanner = () => {
  return (
    <Banner>
      <img src="/image_banner.png" />
      <div>
        <h2>풀터치 스크린으로 계속되는 혁신</h2>
        <span>코웨이 icon PRO</span>
        <span>CHP-7212N</span>
      </div>
    </Banner>
  );
};

export default ImageBanner;
