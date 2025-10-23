import styled from "styled-components";

const VC = styled.div`
  width: 100%;
  padding: 30px 60px;
  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const VideoComp = () => {
  return (
    <VC>
      <video autoPlay muted loop>
        <source src={"/video.mp4"} type="video/mp4" />
      </video>
    </VC>
  );
};

export default VideoComp;
