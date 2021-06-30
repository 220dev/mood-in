import React from "react";
import { Menu } from "antd";

function LeftMenu(props) {
  return (
    <Menu mode={props.mode}>
      <Menu.Item key="mail">
        <a href="/">Shop</a>
      </Menu.Item>
      <Menu.Item key="FAQ">
        <a href="/faq">FAQ</a>
      </Menu.Item>
    </Menu>
  );
}

export default LeftMenu;
