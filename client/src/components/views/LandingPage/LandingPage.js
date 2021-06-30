import React, { useEffect, useState } from "react";
import { FaCode } from "react-icons/fa";
// 백엔드에서 데이터를 가져오도록 요청
import axios from "axios";
import { Icon, Col, Card, Row, Carousel } from "antd";
import Meta from "antd/lib/card/Meta";
import ImageSlider from "../../utils/ImageSlider";
import CheckBox from "./Sections/CheckBox";
import Radiobox from "./Sections/RadioBox";
import SearchFeature from "./Sections/SearchFeature";
import { painters, price } from "./Sections/Datas";

function LandingPage() {
  const [Products, setProducts] = useState([]);
  // 더보기 클릭시 출력될 컬럼 갯수 설정
  const [Skip, setSkip] = useState(0);
  const [Limit, setLimit] = useState(8);
  //추가 데이터가 없을 때는 더보기 버튼이 출력되지 않도록
  const [PostSize, setPostSize] = useState(0);
  const [Filters, setFilters] = useState({
    painters: [],
    price: [],
  });

  const [SearchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    let body = {
      skip: Skip,
      limit: Limit,
    };

    getProducts(body);
  }, []);

  const getProducts = (body) => {
    axios.post("/api/product/products", body).then((response) => {
      if (response.data.success) {
        // loadMore의 경우 기존의 Products를 불러온 후 추가 데이터를 붙여줌
        //이 구간을 지정해주지 않으면 페이지에 더보기로 불러온 추가데이터만 출력됨
        if (body.loadMore) {
          setProducts([...Products, ...response.data.productInfo]);
        } else {
          setProducts(response.data.productInfo);
        }
        setPostSize(response.data.postSize);
      } else {
        alert("상품 정보를 불러오는데 실패했습니다.");
      }
    });
  };

  const loadMoreHandler = () => {
    // skip 재정의
    let skip = Skip + Limit;

    let body = {
      skip: skip,
      limit: Limit,
      loadMore: true,
      filters: Filters,
    };

    getProducts(body);
    setSkip(skip);
  };

  const renderCards = Products.map((product, index) => {
    // 화면이 최대일 때는 4개, 중간일 땐 3개, 최소일 땐 1개
    return (
      <Col lg={6} md={8} xs={24} key={index}>
        <Card
          cover={
            // 각 product의 unique id 값
            <a href={`/product/${product._id}`}>
              <ImageSlider images={product.images} />
            </a>
          }
        >
          <Meta title={product.title} description={`krw${product.price}`} />
        </Card>
      </Col>
    );
  });

  const showFilteredResults = (filters) => {
    let body = {
      skip: 0,
      limit: Limit,
      filters: filters,
    };

    getProducts(body);
    setSkip(0);
  };

  const handlePrice = (value) => {
    const data = price;
    let array = [];

    for (let key in data) {
      if (data[key]._id === parseInt(value, 10)) {
        array = data[key].array;
      }
    }
    return array;
  };

  const handleFilters = (filters, category) => {
    const newFilters = { ...Filters };
    newFilters[category] = filters;
    // console.log("filters", filters); 정보 출력 확인

    if (category === "price") {
      let priceValues = handlePrice(filters);
      newFilters[category] = priceValues;
    }

    showFilteredResults(newFilters);
    setFilters(newFilters);
  };

  const updateSearchTerm = (newSearchTerm) => {
    // SeachFeature.js > props.refrechFunction(event.currentTarget.value)의 값

    let body = {
      skip: 0,
      limit: Limit,
      filters: Filters,
      searchTerm: newSearchTerm,
    };

    setSkip(0);
    setSearchTerm(newSearchTerm);
    getProducts(body);
  };

  // UI
  return (
    <div style={{ width: "75%", margin: "3rem auto" }}>
      <div style={{ textAlign: "center" }}>
        <h2>
          Inspiration in everyday{" "}
          <Icon
            type="fire"
            theme="filled"
            theme="twoTone"
            twoToneColor="#7A65F1"
          />{" "}
        </h2>
        <br />
      </div>

      {/* filter */}
      <Row gutter={[16, 16]}>
        <Col lg={12} xs={24}>
          {/* checkbox */}
          <CheckBox
            list={painters}
            handleFilters={(filters) => handleFilters(filters, "painters")}
          />
        </Col>
        <Col lg={12} xs={24}>
          {/* radiobox */}
          <Radiobox
            list={price}
            handleFilters={(filters) => handleFilters(filters, "price")}
          />
        </Col>
      </Row>

      {/* search */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          margin: "1rem auto",
        }}
      >
        <SearchFeature refreshFunction={updateSearchTerm} />
      </div>

      {/* products cards */}
      <Row gutter={[16, 16]}>{renderCards}</Row>
      <br />

      {/* postsize가 limit보다 크거나 같을 때 더보기 버튼 보여주기 */}
      {PostSize >= Limit && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button onClick={loadMoreHandler}>+ More</button>
        </div>
      )}
    </div>
  );
}

export default LandingPage;
