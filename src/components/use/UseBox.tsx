import styled from "styled-components";

const UseBoxing = styled.div`
  width: 100%;
  padding: 26px;
  background-color: rgb(243, 244, 245);
  margin-bottom: 20px;
  display: flex;
  gap: 1rem;
  .number {
    font-size: 16px;
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    border: 1px solid black;
  }
  .info {
    h1 {
      font-size: 14px;
      line-height: 14px;
      color: rgb(114, 114, 114);
      margin-bottom: 10px;
    }
    p {
      font-weight: 700;
      font-size: 15px;
      line-height: 15px;
    }
    > div.split {
      margin-top: 10px;
      font-size: 14px;
      span {
        &:nth-child(2) {
          color: rgb(85, 165, 242);
        }
      }
    }
    > div.no-split {
      margin-top: 10px;
      font-size: 14px;
      color: rgb(85, 165, 245);
    }
  }
`;

const UseBox = ({
  data,
}: {
  data: {
    number: number;
    title: string;
    content: string;
    buContent: string;
  };
}) => {
  return (
    <UseBoxing>
      <div className="number">{"0" + data.number}</div>
      <div className="info">
        <h1>{data.title}</h1>
        <p>{data.content}</p>
        {data.buContent.includes("|") ? (
          <div className="split">
            <span>{data.buContent.split("|")[0]} + </span>
            <span>{data.buContent.split("|")[1]}</span>
          </div>
        ) : (
          <div className="no-split">{data.buContent}</div>
        )}
      </div>
    </UseBoxing>
  );
};

export default UseBox;
