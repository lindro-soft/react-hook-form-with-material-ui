import React, { ReactElement, useEffect, useState } from "react";
import Tab from "./Tab";
import styles from "./Tabs.module.scss";

interface PropType {
  defaultTab?: number;
  labels?: string[];
  children?: ReactElement[];
}

const Tabs = (props: PropType): ReactElement<PropType> => {
  const [activeTab, setActiveTab] = useState(props.defaultTab);

  const onClickTabItem = (tab: number) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    setActiveTab(props.defaultTab);
  }, [props.defaultTab]);

  const [errorsInTabs, setErrorsInTabs] = useState<boolean[]>();

  useEffect(() => {
    if (props.children) {
      let tabErrors: boolean[] = [];
      //let tabChanged: boolean = false;
      for (var i = 0; i < props.children?.length; i++) {
        tabErrors.push(false);
        var tabDiv = props.children[i];
        if (tabDiv.props.children) {
          for (var u = 0; u < tabDiv.props.children.length; u++) {
            var tabDivChild = tabDiv.props.children[u];

            if (tabDivChild.props && tabDivChild.props.error) {
              tabErrors[i] = true;
              // if (!tabChanged) {
              //   tabChanged = true;
              //   if (activeTab && activeTab > i) {
              //     setActiveTab(i);
              //   }
              // }
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
          if (activeTab === i) {
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
    <div>
      <div className={styles.tabLabel}>Tab group</div>
      <ol className={styles.tabList}>
        {props.labels?.map((label, i) => {
          return (
            <Tab
              activeTab={activeTab ? activeTab : 0}
              key={label}
              label={label}
              index={i}
              error={errorsInTabs ? errorsInTabs[i] : false}
              onClick={onClickTabItem}
            />
          );
        })}
      </ol>
      <div className={styles.tabContent}>
        <div className={styles.tabContentInner}>{tabContent}</div>
      </div>
    </div>
  );
};

export default Tabs;
