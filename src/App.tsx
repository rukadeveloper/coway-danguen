import styled from "styled-components";
import MainLogo from "./components/logo/MainLogo";
import TopInput from "./components/top-input/TopInput";
import ImageSlide from "./components/image-slide/ImageSlide";
import ImageBanner from "./components/image-banner/ImageBanner";
import ImageMainSlide from "./components/image-main-slide/ImageMainSlide";
import GridComp from "./components/grid-comp/GridComp";
import ZehuCard from "./components/zehu-card/ZehuCard";
import VideoComp from "./components/video-comp/VideoComp";
import Matrix from "./components/matrix/Matrix";
import UseContact from "./components/use/UseContact";
import FreeButton from "./components/free-btn/FreeButton";

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 600px;
  margin: 0 auto;
  background-color: #fff;
`;

function App() {
  return (
    <MainWrapper>
      <MainLogo />
      <TopInput />
      <ImageSlide />
      <ZehuCard />
      <ImageBanner />
      <ImageMainSlide />
      <VideoComp />
      <Matrix />
      <GridComp />
      <UseContact />
      <FreeButton />
    </MainWrapper>
  );
}

export default App;
