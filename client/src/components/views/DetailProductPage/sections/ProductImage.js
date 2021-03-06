import React, { useState, useEffect } from "react";
import ImageGallery from "react-image-gallery";

function ProductImage(props) {
  const [Images, setImages] = useState([]);

  useEffect(() => {
    if (props.detail.images && props.detail.images.length > 0) {
      let images = [];

      props.detail.images.map((item) => {
        images.push({
          original: `https://mood-in.herokuapp.com/${item}`,
          thumbnail: `https://mood-in.herokuapp.com/${item}`,
        });
      });
      setImages(images);
    }
    // props.detail의 값이 바뀔 때마다 한 번씩 더 실행하라는 뜻
  }, [props.detail]);

  return (
    <div>
      <ImageGallery items={Images} />
    </div>
  );
}

export default ProductImage;
