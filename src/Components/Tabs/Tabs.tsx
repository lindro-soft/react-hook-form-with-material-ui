import React, { ReactElement, useEffect, useState } from "react";
import { FieldErrors, FieldValues, UseFormSetFocus } from "react-hook-form";
import Tab from "./Tab";
import styles from "./Tabs.module.scss";

interface PropType {
  defaultTab?: number;
  tabLabels?: string[];
  children?: ReactElement[];
  submitClicks: number;
  errors: FieldErrors<FieldValues>;
  setFocus: UseFormSetFocus<FieldValues>;
}

const Tabs = (props: PropType): ReactElement<PropType> => {
  const [activeTab, setActiveTab] = useState(props.defaultTab);
  const [localSubmitClicks, setLocalSubmitClicks] = useState(-1);

  const onClickTabItem = (tab: number) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    setActiveTab(props.defaultTab);
  }, [props.defaultTab]);

  const [errorsInTabs, setErrorsInTabs] = useState<boolean[]>();

  //Switch tab to first tab with errors
  useEffect(() => {
    if (errorsInTabs !== undefined) {
      for (let i = 0; i < errorsInTabs.length; i++) {
        if (errorsInTabs[i] && props.submitClicks > localSubmitClicks) {
          setActiveTab(i);
          setLocalSubmitClicks(props.submitClicks);
          break;
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorsInTabs]);

  //Focus on first input with errors when switching tab
  useEffect(() => {
    const firstError = (
      Object.keys(props.errors) as Array<keyof typeof props.errors>
    ).reduce<keyof typeof props.errors | null>((field, a) => {
      const fieldKey = field as keyof typeof props.errors;
      return !!props.errors[fieldKey] ? fieldKey : a;
    }, null);
    if (firstError) {
      props.setFocus(firstError);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  //Find out which tabs have errors
  useEffect(() => {
    if (props.children) {
      let tabErrors: boolean[] = [];
      for (var i = 0; i < props.children?.length; i++) {
        tabErrors.push(false);
        var tabDiv = props.children[i];
        if (tabDiv.props.children) {
          for (var u = 0; u < tabDiv.props.children.length; u++) {
            var tabDivChild = tabDiv.props.children[u];
            if (tabDivChild.props && tabDivChild.props.error) {
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
        if (props.tabLabels) {
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
      <ol className={styles.tabList}>
        {props.tabLabels?.map((label, i) => {
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
      <div className={styles.tabContent}>{tabContent}</div>
    </div>
  );
};

export default Tabs;
