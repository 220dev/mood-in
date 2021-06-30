import React, { useState } from "react";
import Dropzone from "react-dropzone";
import { Icon } from "antd";
import axios from "axios";
import { PromiseProvider } from "mongoose";

function FileUpload(props) {
  // 이미지를 여러장 받기 위해 array로 설정
  const [Images, setImages] = useState([]);

  const dropHandler = (files) => {
    let formData = new FormData();
    const config = {
      header: { "content-type": "multipart/form-data" },
    };
    formData.append("file", files[0]);

    axios
      .post("/api/product/image", formData, config)
      // response 안에 정보가 들어있음
      .then((response) => {
        if (response.data.success) {
          //원래 있던 이미지 전부와 새로운 이미지
          setImages([...Images, response.data.filePath]);
          props.refreshFunction([...Images, response.data.filePath]);
        } else {
          alert("파일을 저장하는데 실패했습니다.");
        }
      });
  };

  const deleteHandler = (image) => {
    const currentIndex = Images.indexOf(image);

    // 이미지를 새롭게 복사
    let newImages = [...Images];
    // 선택한 인덱스 하나만 삭제할 거기 때문에 1을 적어줌
    newImages.splice(currentIndex, 1);
    setImages(newImages);
    props.refreshFunction(newImages);
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <Dropzone onDrop={dropHandler}>
        {({ getRootProps, getInputProps }) => (
          <div
            style={{
              width: 300,
              height: 240,
              border: "1px solid lightgrey",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            <Icon type="plus" style={{ fontSize: "2rem" }} />
          </div>
        )}
      </Dropzone>

      {/* 파일이 들어왔을 때 우측에 뜨도록 */}
      <div
        style={{
          display: "flex",
          width: "350px",
          height: "240px",
          overflowX: "scroll",
        }}
      >
        {/* 여러가지의 이미지가 들어가있기 때문에 하나하나 컨트롤 해주기 위해 map 매소드 사용 */}
        {Images.map((image, index) => (
          // index를 갖기 위해 핸들러에 image를 넣어줌
          <div onClick={() => deleteHandler(image)} key={index}>
            <img
              style={{ minWidth: "300px", width: "300px", height: "240px" }}
              src={`http://localhost:5000/${image}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default FileUpload;
