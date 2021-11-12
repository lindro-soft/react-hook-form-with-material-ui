import React, { ReactElement } from "react";

interface PropType {
  activeTab: string;
  label: string;
  onClick: any;
  error: boolean;
}

const Tab = (props: PropType): ReactElement => {
  const onClick = () => {
    const { label, onClick } = props;
    onClick(label);
  };

  let className = "tab-list-item";

  if (props.activeTab === props.label) {
    className += " tab-list-active";
  }

  return (
    <li className={className} onClick={onClick}>
      {props.label} {props.error ? "(ERROR)" : undefined}
    </li>
  );
};

export default Tab;
