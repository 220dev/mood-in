import React, { useState } from "react";
import { Collapse, Checkbox } from "antd";

const { Panel } = Collapse;

function CheckBox(props) {
  const [Checked, setChecked] = useState([]);

  // 이미지 첨부 삭제 로직과 유사함
  const handleToggle = (value) => {
    // 체크한 것의 index를 구함
    const currentIndex = Checked.indexOf(value);

    // 전체 checked된 state에서 현재 누른 checkbox가 이미 있다면
    const newChecked = [...Checked];
    // state 를 넣어줌
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      //빼줌
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
    props.handleFilters(newChecked);
  };

  const renderCheckboxLists = () =>
    props.list &&
    props.list.map((value, index) => (
      <React.Fragment key={index}>
        <Checkbox
          onChange={() => handleToggle(value._id)}
          checked={Checked.indexOf(value._id) === -1 ? false : true}
        />
        <span>{value.name}</span>
      </React.Fragment>
    ));

  return (
    <div>
      <Collapse defaultActiveKey={["0"]}>
        <Panel header="Painters" key="1">
          {renderCheckboxLists()}
        </Panel>
      </Collapse>
    </div>
  );
}

export default CheckBox;
