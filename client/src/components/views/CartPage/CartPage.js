import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getCartItems, removeCartItem } from "../../../_actions/user_actions";
import UserCardBlock from "./Sections/UserCardBlock";
import { Empty } from "antd";
import { FaFileExcel } from "react-icons/fa";
import { Button } from "antd";

function CartPage(props) {
  const dispatch = useDispatch();

  const [Total, setTotal] = useState(0);
  const [ShowTotal, setShowTotal] = useState(false);

  // 상품을 가져오기 위해
  useEffect(() => {
    let cartItems = [];

    // 리덕스 User state의 cart 안에 상품이 들어있는지 확인
    if (props.user.userData && props.user.userData.cart) {
      // 상품이 하나 이상 들어있다면
      if (props.user.userData.cart.length > 0) {
        props.user.userData.cart.forEach((item) => {
          cartItems.push(item.id);
        });

        dispatch(getCartItems(cartItems, props.user.userData.cart)).then(
          (response) => {
            calculateTotal(response.payload);
          }
        );
      }
    }
  }, [props.user.userData]);

  let calculateTotal = (cartDetail) => {
    let total = 0;

    cartDetail.map((item) => {
      total += parseInt(item.price, 10) * item.quantity;
    });

    setTotal(total);
    setShowTotal(true);
  };

  let removeFromCart = (productId) => {
    dispatch(removeCartItem(productId)).then((response) => {
      if (response.payload.productInfo.length <= 0) {
        setShowTotal(false);
      }
    });
  };

  return (
    <div style={{ width: "85%", margin: "3rem auto" }}>
      <h1>My Cart</h1>
      <div>
        <UserCardBlock
          products={props.user.cartDetail}
          removeItem={removeFromCart}
        />
      </div>

      {ShowTotal ? (
        <div
          style={{
            marginTop: "3rem",
          }}
        >
          <h2>Total Amount: KRW {Total}</h2>
        </div>
      ) : (
        <>
          <br />
          <br />
          <br />
          <br />
          <Empty description={false} />
        </>
      )}
      <Button type="primary" shape="round" size="large">
        Pay for all products
      </Button>
    </div>
  );
}

export default CartPage;
