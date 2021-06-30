import React from "react";
import "./UserCardBlock.css";

function UserCardBlock(props) {
  const renderCartImage = (images) => {
    if (images.length > 0) {
      let image = images[0];
      return `http://localhost:5000/${image}`;
    }
  };

  const renderItems = () =>
    props.products &&
    props.products.map((product, index) => (
      <tr key={index}>
        <td class="cartList">
          <img
            style={{ width: "70px" }}
            alt="product"
            src={renderCartImage(product.images)}
          />
        </td>
        <td class="cartList">{product.quantity} EA</td>
        <td class="cartList">krw {product.price}</td>
        <td class="cartList">
          <button onClick={() => props.removeItem(product._id)}>Remove</button>
        </td>
      </tr>
    ));

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>Product Image</th>
            <th style={{ textAlign: "center" }}>Product Quantity</th>
            <th style={{ textAlign: "center" }}>Product Price</th>
            <th style={{ textAlign: "center" }}>Remove from Cart</th>
          </tr>
        </thead>

        <tbody>{renderItems()}</tbody>
      </table>
    </div>
  );
}

export default UserCardBlock;
