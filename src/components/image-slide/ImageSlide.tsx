import styled from "styled-components";

import { Swiper, SwiperSlide } from "swiper/react";

import { Autoplay } from "swiper/modules";

import "swiper/css";

const ImageSlider = styled.div`
  .info {
    margin-top: 30px;
    padding: 30px 0;
    margin-bottom: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #000;
    border-radius: 1rem;
    h2 {
      text-align: center;
      margin-bottom: 40px;
      font-size: 30px;
      font-family: "PyeojinGothic", sans-serif !important;
      font-weight: 700;
      color: #000;
      padding: 0 30px;
      border-radius: 10px;
      background-color: #f3f4f5;
    }
    ul {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      li {
        display: inline-block;
        padding-left: 25%;
        dl {
          display: flex;
          font-size: 22px;
          font-family: "PyeojinGothic", sans-serif !important;
          font-weight: 300;
          color: #fff;
          dd {
            width: 30%;
            display: flex;
            align-items: center;
            gap: 20px;
            &::before {
              content: "";
              display: block;
              width: 6px;
              height: 6px;
              background-color: #fff;
            }
          }
        }
      }
    }
  }
  .swiper {
    width: 500px;
    height: 500px;
    @media screen and (max-width: 500px) {
      width: 360px;
    }
    .swiper-wrapper {
      height: 100%;
    }
  }
  .swiper-slide {
    height: 100%;
    &:nth-child(1) {
      background: url("/coway_product.png") no-repeat center;
      background-size: 95%;
      position: relative;
      > div {
        position: absolute;
        text-align: center;
        width: 100px;
        height: 100px;
        background-color: rgb(75, 150, 241);
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        border-radius: 50%;
        bottom: 100px;
        right: 40px;
        color: #fff;
        font-family: "PyeojinGothic", sans-serif !important;
        font-size: 18px;
        span {
          &:nth-child(1) {
            font-weight: 300;
            line-height: 20px;
            font-size: 20px;
          }
          &:nth-child(2) {
            font-size: 24px;
            font-weight: 700;
            line-height: 30px;
          }
        }
      }
    }
    &:nth-child(2) {
      background: url("/coway_product_2.jpg") no-repeat center;
      background-size: 95%;
      position: relative;
    }
    &:nth-child(3) {
      background-color: black;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      p {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size: 40px;
        color: #fff;
        font-family: "PyeojinGothic", sans-serif !important;
        font-weight: 700;
      }
    }
  }
`;

const ImageSlide = () => {
  return (
    <ImageSlider>
      <Swiper modules={[Autoplay]} autoplay={{ delay: 2500 }}>
        <SwiperSlide>
          <div>
            <span>12개월</span>
            <span>반값</span>
          </div>
        </SwiperSlide>
        <SwiperSlide></SwiperSlide>
        <SwiperSlide>
          <p>
            <span>침대 홈케어</span>
            <span>1회 서비스</span>
          </p>
        </SwiperSlide>
      </Swiper>
      <div className="info">
        <h2>아이콘 프로</h2>
        <ul>
          <li>
            <dl>
              <dd>구매</dd>
              <dt>1,400,000원</dt>
            </dl>
          </li>
          <li>
            <dl>
              <dd>렌탈</dd>
              <dt style={{ color: "#4a67f0" }}>월 14,450원~</dt>
            </dl>
          </li>
        </ul>
      </div>
    </ImageSlider>
  );
};

export default ImageSlide;
