import styled from "styled-components";
import GridItems from "./GridItems";

const GC = styled.div`
  width: 100%;
  h2 {
    margin-top: 30px;
    width: 100%;
    padding: 0.3rem 1rem;
    font-size: 26px;
    text-align: center;
  }
  @media screen and (max-width: 530px) {
    h2 {
      font-size: 20px;
    }
  }
`;

const GCG = styled.div`
  .wrapper {
    .group {
      .group__header {
        display: flex;
        flex-direction: column;
        align-items: center;
        .title {
          display: inline-block;
          background-color: #000;
          color: #fff;
          text-align: center;
          padding: 1rem 0.8rem;
          border-radius: 6px;
          margin-top: 20px;
          margin-bottom: 30px;
          font-size: 20px;
          font-weight: 500;
        }
        span {
          margin-bottom: 20px;
          text-align: center;
        }
      }
    }
    .items {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
      > div {
        width: calc((100% - 10px) / 2);
        background-color: rgb(241, 242, 244);
      }
    }
    @media screen and (max-width: 550px) {
      .group {
        .group__header {
          .title {
            font-size: 16px;
            margin-bottom: 10px;
          }
          span {
            font-size: 14px;
          }
        }
      }
      .items {
        flex-direction: column;
        > div {
          width: 100%;
        }
      }
    }
  }
`;

const GridComp = () => {
  const gridItems = [
    {
      gridId: 0,
      title: "침대 ~ 매트리스 렌탈 시 ~ 4개월마다 홈케어 서비스",
      subTitle: "동시구매 10% 할인 + 반값할인 + 재렌탈 할인 최대 20%",
      imageUrl: "/thumb-ss1_280x280.png",
      isBest: false,
      isPackage: false,
      sale: "12개월|반값",
      productName: "엘리트 매트리스 슈퍼싱글",
      buy: "1375000",
      rental: "26900",
    },
    {
      gridId: 1,
      title: "침대 ~ 매트리스 렌탈 시 ~ 4개월마다 홈케어 서비스",
      subTitle: "동시구매 10% 할인 + 반값할인 + 재렌탈 할인 최대 20%",
      imageUrl: "/matrix4.png",
      isBest: false,
      isPackage: true,
      sale: null,
      productName: "BEREX 프라임 & 모던 침대",
      buy: "2377000|2085300",
      rental: "30800|21070",
    },
    {
      gridId: 2,
      title: "공기청정기 + 공기 제습기",
      subTitle: "타사제품 보상할인 최대 25% 할인가 적용",
      imageUrl: "/air.png",
      isBest: true,
      isPackage: false,
      sale: "12개월|반값",
      productName: "노블 공기청정기2(53m²)",
      buy: "1010000",
      rental: "15450",
    },
    {
      gridId: 3,
      title: "공기청정기 + 공기 제습기",
      subTitle: "타사제품 보상할인 최대 25% 할인가 적용",
      imageUrl: "/air4.png",
      isBest: false,
      isPackage: false,
      sale: null,
      productName: "듀얼클린 공기청정기",
      buy: "1670000|1530000",
      rental: "41900|18950",
    },
    {
      gridId: 4,
      title: "공기청정기 + 공기 제습기",
      subTitle: "타사제품 보상할인 최대 25% 할인가 적용",
      imageUrl: "/cloth1.png",
      isBest: false,
      isPackage: false,
      sale: null,
      productName: "사계절 의류 청정기 더블케어",
      buy: "2400000",
      rental: "42950",
    },
    {
      gridId: 5,
      title: "공기청정기 + 공기 제습기",
      subTitle: "타사제품 보상할인 최대 25% 할인가 적용",
      imageUrl: "/cloth4.png",
      isBest: false,
      isPackage: false,
      sale: null,
      productName: "사계절 의류 청정기 더블케어",
      buy: "2250000|2250000",
      rental: "41900|40900",
    },
    {
      gridId: 6,
      title: "비데",
      subTitle: "패키지 플러스 15% 할인가 적용 + 첫달 렌탈비 지원",
      imageUrl: "/vide1.png",
      isBest: false,
      isPackage: false,
      sale: "9개월|반값",
      productName: "스타일케어 비데",
      buy: "800000",
      rental: "9950",
    },
    {
      gridId: 7,
      title: "비데",
      subTitle: "패키지 플러스 15% 할인가 적용 + 첫달 렌탈비 지원",
      imageUrl: "/vide4.png",
      isBest: false,
      isPackage: false,
      sale: null,
      productName: "사계절 의류 청정기 더블케어",
      buy: "1530000|1377000",
      rental: "45800|32980",
    },
    {
      gridId: 8,
      title: "인덕션",
      subTitle: "제휴카드 결합시 무료 렌탈 + 3년 후 상반교체 서비스",
      imageUrl: "/ind1.png",
      isBest: false,
      isPackage: false,
      sale: null,
      productName: "프라임 하이브리드 (인덕션 2구 + 하이라이트 1구)",
      buy: "910000",
      rental: "12900",
    },
    {
      gridId: 9,
      title: "인덕션",
      subTitle: "제휴카드 결합시 무료 렌탈 + 3년 후 상반교체 서비스",
      imageUrl: "/ind2.png",
      isBest: false,
      isPackage: false,
      sale: null,
      productName: "노블 인덕션 All-Free (4구)",
      buy: "2640000|2390000",
      rental: "35900|27900",
    },
    {
      gridId: 10,
      title: "안마 의자",
      subTitle:
        "갤러리 매장에서 체험 후 디자인과 체형에 맞는 안마기능 제품으로|렌탈구매 가능합니다 (담당차량운행)",
      imageUrl: "/ch2.png",
      isBest: false,
      isPackage: false,
      sale: "6개월|반값",
      productName: "BEREX 트리플체어",
      buy: "2980000",
      rental: "30450",
    },
    {
      gridId: 11,
      title: "안마 의자",
      subTitle:
        "갤러리 매장에서 체험 후 디자인과 체형에 맞는 안마기능 제품으로|렌탈구매 가능합니다 (담당차량운행)",
      imageUrl: "/ch5.png",
      isBest: false,
      isPackage: false,
      sale: null,
      productName: "BEREX 안마 의자 시그니처",
      buy: "6000000|5000000",
      rental: "110000|54500",
    },
    {
      gridId: 13,
      title: "안마 의자",
      subTitle:
        "갤러리 매장에서 체험 후 디자인과 체형에 맞는 안마기능 제품으로|렌탈구매 가능합니다 (담당차량운행)",
      imageUrl: "/chair1.png",
      isBest: false,
      isPackage: false,
      sale: null,
      productName: "",
      buy: "6000000|5000000",
      rental: "110000|54500",
    },
    {
      gridId: 14,
      title: "안마 의자",
      subTitle:
        "갤러리 매장에서 체험 후 디자인과 체형에 맞는 안마기능 제품으로|렌탈구매 가능합니다 (담당차량운행)",
      imageUrl: "/chair2.png",
      isBest: false,
      isPackage: false,
      sale: null,
      productName: "",
      buy: "6000000|5000000",
      rental: "110000|54500",
    },
  ];

  const groupedByTitle = gridItems.reduce((acc, item) => {
    if (!acc[item.title]) {
      acc[item.title] = [];
    }
    acc[item.title].push(item);
    return acc;
  }, {} as Record<string, typeof gridItems>);

  return (
    <GC>
      <h2>베스트 제품을 확인하세요!</h2>
      <GCG>
        <div className="wrapper">
          {Object.entries(groupedByTitle).map(([title, items], index) => {
            // 그룹 내부에 gridId가 홀수인 항목이 하나라도 있으면 title을 표시
            const hasTitle = items.some((item) => item.gridId % 2 === 1);

            return (
              <div className="group" key={index}>
                {hasTitle && (
                  <div className="group__header">
                    <div className="title" aria-label="그리드 타이틀">
                      {title}
                    </div>
                    <span>
                      {items[0].subTitle.includes("|") ? (
                        <>
                          {items[0].subTitle.split("|")[0]} <br />
                          {items[0].subTitle.split("|")[1]}
                        </>
                      ) : (
                        items[0].subTitle
                      )}
                    </span>
                  </div>
                )}

                <div className="items">
                  {items.map((subItem) => (
                    <GridItems
                      key={subItem.gridId}
                      data={subItem}
                      id={subItem.gridId}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </GCG>
    </GC>
  );
};

export default GridComp;
