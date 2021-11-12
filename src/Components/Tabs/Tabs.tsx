import React, { ReactElement, useEffect, useState } from "react";
import Tab from "./Tab";

interface PropType {
  defaultTab?: string;
  labels?: string[];
  children?: ReactElement[];
}

const Tabs = (props: PropType): ReactElement<PropType> => {
  const [activeTab, setActiveTab] = useState(props.defaultTab);

  const onClickTabItem = (tab: string) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    setActiveTab(props.defaultTab);
  }, [props.defaultTab]);

  const [errorsInTabs, setErrorsInTabs] = useState<boolean[]>();

  useEffect(() => {
    if (props.children) {
      let tabErrors: boolean[] = [];

      for (var i = 0; i < props.children?.length; i++) {
        tabErrors.push(false);
        var child = props.children[i];
        if (child.props.children) {
          for (var u = 0; u < child.props.children.length; u++) {
            var grandChild = child.props.children[u];

            if (grandChild.props && grandChild.props.error) {
              tabErrors[i] = true;
            }
          }
        }
      }
      setErrorsInTabs(tabErrors);
    }
  }, [props.children]);

  const tabContent = props.children
    ? props.children.map((child, i) => {
        if (props.labels) {
          if (activeTab === props.labels[i]) {
            return React.cloneElement(child, {
              key: i,
            });
          } else {
            return React.cloneElement(child, {
              style: { display: "none" },
              key: i,
            });
          }
        }
        return undefined;
      })
    : undefined;

  return (
    <div className="tabs">
      <div className="tabLabel">Tab group</div>
      <ol className="tab-list">
        {props.labels?.map((label, i) => {
          return (
            <Tab
              activeTab={activeTab ? activeTab : ""}
              key={label}
              label={label}
              error={errorsInTabs ? errorsInTabs[i] : false}
              onClick={onClickTabItem}
            />
          );
        })}
      </ol>
      <div className="tab-content">{tabContent}</div>
    </div>
  );
};

export default Tabs;
