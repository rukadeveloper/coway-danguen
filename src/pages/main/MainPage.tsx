import styled from "styled-components";

import MainLogo from "../../components/logo/MainLogo";
import Matrix from "../../components/matrix/Matrix";
import UseContact from "../../components/use/UseContact";
import AllianceCard from "../../components/alliance-card/AllianceCard";
import BedList from "../../components/bed-list/BedList";

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 600px;
  overflow-x: hidden;
  margin: 0 auto;
  background-color: #fff;
`;

const BannerText = styled.div`
  width: 100%;
  background-color: #000;
  color: #fff;
  text-align: center;
  padding: 12px 20px;
  font-size: 20px;
  font-weight: 600;
  font-family: "PyeojinGothic", sans-serif !important;

  @media screen and (max-width: 600px) {
    font-size: 18px;
  }

  @media screen and (max-width: 480px) {
    font-size: 16px;
  }
`;

const MainPage = () => {
  return (
    <MainWrapper>
      <MainLogo />
      <BannerText>제휴카드 이용시 무료렌탈</BannerText>
      <AllianceCard />
      <Matrix />
      <BedList />
      <UseContact />
    </MainWrapper>
  );
};

export default MainPage;
