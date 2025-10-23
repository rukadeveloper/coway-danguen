import styled from "styled-components";

const GridItem = styled.div`
  margin-bottom: 30px;
  .image-type {
    aspect-ratio: 1 / 1.15;
    position: relative;
    &.addBg {
      &::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 60%;
        background-color: rgb(233, 242, 245);
      }
    }
    &.allBg {
      background-color: rgb(242, 244, 245);
    }

    img {
      position: absolute;
      bottom: 60px;
      z-index: 10;
    }
    .package {
      position: absolute;
      top: 20px;
      left: 20px;
      padding: 5px 10px;
      font-size: 14px;
      background-color: rgb(230, 241, 254);
      border-radius: 20px;
      color: rgb(71, 151, 207);
      font-weight: 700;
    }
    > span {
      position: absolute;
      top: 30px;
      left: 30px;
      z-index: 11;
      display: flex;
      flex-direction: column;
      color: rgb(75, 165, 223);
      font-family: "PyeojinGothic", sans-serif !important;
      font-weight: 400;
      font-size: 18px;
      b {
        font-size: 24px;
        line-height: 24px;
        font-weight: 700;
      }
    }
    .sale-info {
      position: absolute;
      bottom: 0;
      right: 30px;
      width: 80px;
      height: 80px;
      background-color: rgb(74, 151, 240);
      border-radius: 50%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      span {
        color: #fff;
        font-family: "PyeojinGothic", sans-serif !important;
        &:nth-child(1) {
          font-size: 14px;
          line-height: 14px;
          font-weight: 300;
        }
        &:nth-child(2) {
          font-size: 20px;
          line-height: 28px;
          font-weight: 700;
        }
      }
    }
  }
  .product-info {
    h3 {
      text-align: center;
      padding-top: 30px;
      font-size: 22px;
      margin-bottom: 50px;
    }
    .price-info-wrapper1 {
      dl {
        display: flex;
        justify-content: center;
        gap: 10px;
        font-size: 15px;
        margin-bottom: 10px;
        span {
          color: rgb(107, 170, 224);
          font-weight: 700;
        }
      }
    }
    .price-info-wrapper2 {
      dl {
        display: flex;
        justify-content: space-between;
        align-items: center;
        max-width: 80%;
        margin: 0 auto;
        &:nth-of-type(3) {
          dt {
            color: rgb(238, 131, 120);
            font-weight: 400;
          }
        }
        dd {
          font-weight: 700;
          font-size: 15px;
        }
        dt {
          font-weight: 300;
          display: flex;
          font-size: 14px;
          gap: 10px;
          span {
            &:nth-child(1) {
              text-decoration: line-through;
              color: rgb(203, 212, 215);
            }
            &:nth-child(2) {
              font-weight: 700;
            }
          }
        }
      }
      @media screen and (max-width: 550px) {
        dl {
          dd,
          dt {
            font-size: 13px;
          }
        }
      }
    }
  }
`;

const GridItems = ({ data, id }: { data: any; id: number }) => {
  return (
    <GridItem>
      <div className={`image-type ${id % 2 === 0 ? "addBg" : "allBg"}`}>
        <img
          src={data.imageUrl}
          alt="grid-item"
          style={{
            top: id === 0 ? "30px" : "",
            bottom:
              (id === 2 || id === 3 ? "20px" : "") ||
              (id === 4 || id === 5 ? "-10px" : ""),
            right: id === 3 || id === 4 ? "0" : "",
          }}
        />
        {data.isBest && (
          <span>
            BEST<b>01</b>
          </span>
        )}
        {data.isPackage && <div className="package">패키지</div>}
        {data.sale && (
          <div className="sale-info">
            {data.sale.split("|").map((s: any) => (
              <span>{s}</span>
            ))}
          </div>
        )}
      </div>
      {id <= 11 && (
        <div
          className="product-info"
          style={{
            backgroundColor: id % 2 === 1 ? "rgb(242,244,245)" : "",
            paddingBottom: "20px",
          }}
        >
          <h3>{data.productName}</h3>
          {id % 2 === 0 ? (
            <div className="price-info-wrapper1">
              <dl>
                <dd>구매</dd>
                <dt>{Number(data.buy).toLocaleString()}원</dt>
              </dl>
              <dl>
                <dd>렌탈</dd>
                <dt>
                  월 <span>{Number(data.rental).toLocaleString()}원~</span>
                </dt>
              </dl>
              {id === 0 && (
                <>
                  <dl>
                    <dd>프로모션</dd>
                    <dt>월 22,900원</dt>
                  </dl>
                  <dl>
                    <dd>제휴카드</dd>
                    <dt>월 7,900원</dt>
                  </dl>
                </>
              )}
            </div>
          ) : (
            <div className="price-info-wrapper2">
              <dl>
                <dd>구매</dd>
                <dt>
                  <span>
                    {Number(data.buy.split("|")[0]).toLocaleString()}원
                  </span>
                  <span>
                    {Number(data.buy.split("|")[1]).toLocaleString()}원
                  </span>
                </dt>
              </dl>
              <dl>
                <dd>렌탈</dd>
                <dt>
                  <span>
                    월 {Number(data.rental.split("|")[0]).toLocaleString()}원
                  </span>
                  <span>
                    월 {Number(data.rental.split("|")[1]).toLocaleString()}원
                  </span>
                </dt>
              </dl>
              <dl>
                <dd>제휴카드 혜택가</dd>
                <dt>
                  {id === 5 && "월 10,900원 ~ "}
                  {id === 7 && "월 2,980원 ~"}
                  {id === 11 && "월 24,500원 ~"}
                  {id !== 5 && id !== 7 && id !== 11 && "월 0원 ~"}
                </dt>
              </dl>
            </div>
          )}
        </div>
      )}
    </GridItem>
  );
};

export default GridItems;
