import styled from "styled-components";

const ML = styled.div`
  @media (max-width: 500px) {
    img {
      width: 160px;
    }
  }
`;

const MainLogo = () => {
  return (
    <ML style={{ marginBottom: "20px" }}>
      <img src={"/coway_logo.png"} alt="logo" width={240} />
    </ML>
  );
};

export default MainLogo;
