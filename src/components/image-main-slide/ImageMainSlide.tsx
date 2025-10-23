import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";

import { Navigation, Autoplay } from "swiper/modules";
import { useRef, useState } from "react";

const IMS = styled.div`
  width: 100%;
  background-color: rgb(36, 36, 36);
  padding: 50px 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media screen and (max-width: 470px) {
    padding: 0;
  }
  > ul {
    display: flex;
    gap: 10px;
    margin-top: 20px;
    @media screen and (max-width: 490px) {
      display: none;
    }
    li {
      flex: 1;
      aspect-ratio: 1/1;
      cursor: pointer;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      &.active {
        border: 4px solid white;
        position: relative;
        &::after {
          content: "";
          position: absolute;
          inset: 0;
          background-color: rgba(0, 0, 0, 0.3);
        }
      }
    }
  }
  .swiper-button-prev,
  .swiper-button-next {
    color: #fff;
    svg {
      width: 22px;
      height: 22px;
    }
  }
  .swiper {
    width: 100%;
  }
  .swiper-slide {
    position: relative;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    div {
      position: absolute;
      right: 0;
      top: 10%;
      padding: 10px 30px;
      background-color: rgb(207, 208, 209);
      color: #000;
      font-size: 20px;
      font-family: "PyeojinGothic", sans-serif !important;
      border-radius: 10px 0 0 10px;
      @media screen and (max-width: 580px) {
        font-size: 16px;
      }
      @media screen and (max-width: 500px) {
        font-size: 14px;
      }
    }
    &:nth-child(2) {
      div {
        color: #000;
        background-color: #fff;
      }
    }
    &:nth-child(3) {
      div {
        color: #ff;
        background-color: rgb(219, 197, 186);
      }
    }
    &:nth-child(4) {
      div {
        color: #fff;
        background-color: black;
      }
    }
    &:nth-child(5) {
      div {
        color: #fff;
        background-color: #6e7377;
      }
    }
  }
`;

const ImageMainSlide = () => {
  const [swiperActiveIndex, setSwiperActiveIndex] = useState(0);
  const swiperRef = useRef<any>(null);

  const handleSwiperChange = (swiper: any) => {
    setSwiperActiveIndex(swiper.activeIndex);
  };

  return (
    <IMS>
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        modules={[Navigation, Autoplay]}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        navigation={true}
        onSlideChange={handleSwiperChange}
      >
        <SwiperSlide>
          <img src={"/iron_silver.jpg"} alt="iron_silver" />
          <div>아이언 실버</div>
        </SwiperSlide>
        <SwiperSlide>
          <img src={"/poslin_white.jpg"} alt="poslin_white" />
          <div>포슬린 화이트</div>
        </SwiperSlide>
        <SwiperSlide>
          <img src={"/bronze_beize.jpg"} alt="bronze_beize" />
          <div>브론즈 베이지</div>
        </SwiperSlide>
        <SwiperSlide>
          <img src={"/pevel_black.jpg"} alt="pevel_black" />
          <div>페블 블랙</div>
        </SwiperSlide>
        <SwiperSlide>
          <img src={"/icy_blue.jpg"} alt="icy_blue" />
          <div>아이시 블루</div>
        </SwiperSlide>
      </Swiper>
      <ul>
        <li
          className={swiperActiveIndex === 0 ? "active" : ""}
          onClick={() => {
            setSwiperActiveIndex(0);
            swiperRef.current.slideTo(0);
          }}
        >
          <img src={"/iron_silver.jpg"} alt="iron_silver" />
        </li>
        <li
          className={swiperActiveIndex === 1 ? "active" : ""}
          onClick={() => {
            setSwiperActiveIndex(1);
            swiperRef.current.slideTo(1);
          }}
        >
          <img src={"/poslin_white.jpg"} alt="poslin_white" />
        </li>
        <li
          className={swiperActiveIndex === 2 ? "active" : ""}
          onClick={() => {
            setSwiperActiveIndex(2);
            swiperRef.current.slideTo(2);
          }}
        >
          <img src={"/bronze_beize.jpg"} alt="bronze_beize" />
        </li>
        <li
          className={swiperActiveIndex === 3 ? "active" : ""}
          onClick={() => {
            swiperRef.current.slideTo(3);
          }}
        >
          <img src={"/pevel_black.jpg"} alt="pevel_black" />
        </li>
        <li
          className={swiperActiveIndex === 4 ? "active" : ""}
          onClick={() => {
            swiperRef.current.slideTo(4);
          }}
        >
          <img src={"/icy_blue.jpg"} alt="icy_blue" />
        </li>
      </ul>
    </IMS>
  );
};

export default ImageMainSlide;
