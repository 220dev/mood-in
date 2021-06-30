import React, { useState } from "react";
import { Form, Input } from "antd";
import FileUpload from "../../utils/FileUpload";
import Axios from "axios";

const { TextArea } = Input;

//selection 화가 이름 정의
const Painters = [
  { key: 1, value: "Auguste Renoir" },
  { key: 2, value: "Claude Monet" },
  { key: 3, value: "Frida Kahlo" },
  { key: 4, value: "Gustav Klimt" },
  { key: 5, value: "Henri Matisse" },
  { key: 6, value: "Pablo Picasso" },
  { key: 7, value: "Vincent Van Gogh" },
];

function UploadProductPage(props) {
  const [Title, setTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [Price, setPrice] = useState(0);
  const [Painter, setPainter] = useState(1);
  const [Images, setImages] = useState([]);

  const titleChangeHandler = (event) => {
    setTitle(event.currentTarget.value);
  };

  const descriptionChangeHandler = (event) => {
    setDescription(event.currentTarget.value);
  };

  const priceChangeHandler = (event) => {
    setPrice(event.currentTarget.value);
  };

  const painterChangeHandler = (event) => {
    setPainter(event.currentTarget.value);
  };

  const updateImages = (newImages) => {
    setImages(newImages);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    // 제품 등록 유효성 체크
    if (!Title || !Description || !Price || !Painter || !Images) {
      return alert(" 모든 항목을 채워주시기 바랍니다. ");
    }

    const body = {
      // 로그인한 사람의 ID 불러오기
      writer: props.user.userData._id,
      title: Title,
      description: Description,
      price: Price,
      images: Images,
      painters: Painter,
    };

    // 채운 항목을 서버에 request로 보내줌
    Axios.post("/api/product", body).then((response) => {
      if (response.data.success) {
        alert(" 상품이 성공적으로 업로드되었습니다. ");
        // 상품 등록 성공 후 랜딩페이지로 이동하도록 설정
        props.history.push("/");
      } else {
        alert(" 상품 업로드에 실패했습니다. ");
      }
    });
  };

  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <h2> Upload </h2>
      </div>

      <Form onSubmit={submitHandler}>
        {/* dropzone */}
        <FileUpload refreshFunction={updateImages} />
        <br />
        <br />
        <label>title</label>
        {/* onchange가 일어날 때 function을 이용해서 value 값을 변경해줌*/}
        <Input onChange={titleChangeHandler} value={Title} />
        <br />
        <br />
        <label>description</label>
        <TextArea onChange={descriptionChangeHandler} value={Description} />
        <br />
        <br />
        <label>price</label>
        <Input type="number" onChange={priceChangeHandler} value={Price} />
        <br />
        <br />
        <label>painter</label> <br />
        <select onChange={painterChangeHandler} value={Painter}>
          {Painters.map((item) => (
            <option key={item.key} value={item.key}>
              {" "}
              {item.value}
            </option>
          ))}
        </select>
        <br />
        <br />
        <button type="submit">Upload</button>
      </Form>
    </div>
  );
}

export default UploadProductPage;
