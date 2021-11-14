import React, { ReactElement } from "react";
import img_red_dot from "./red_dot.png";
import styles from "./Tab.module.scss";

interface PropType {
  activeTab: number;
  label: string;
  onClick: any;
  error: boolean;
  index: number;
}

const Tab = (props: PropType): ReactElement => {
  const onClick = () => {
    const { index, onClick } = props;
    onClick(index);
  };

  let className = styles.tabListItem;

  if (props.activeTab === props.index) {
    className += " " + styles.tabListActive;
  }

  if (props.error) {
    className += " " + styles.errorDot;
  }

  return (
    <li className={className} onClick={onClick}>
      <span style={{ position: "relative", left: "-3px" }}>
        {props.error ? (
          <img alt="Validation Error" src={img_red_dot} />
        ) : undefined}
      </span>
      <span
        style={
          props.error
            ? {
                position: "relative",
                left: "-5px",
                marginRight: "10px",
                marginLeft: "10px",
              }
            : { marginRight: "15px", marginLeft: "15px" }
        }
      >
        {props.label}
      </span>
    </li>
  );
};

export default Tab;
