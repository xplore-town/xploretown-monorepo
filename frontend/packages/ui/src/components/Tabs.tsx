import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import React from "react";
import type { BaseComponentProps, ValueCallback } from "../types";

export interface TabItem {
  label: string;
  content: React.ReactNode;
}

export interface TabsProps extends BaseComponentProps {
  tabs: TabItem[];
  defaultIndex?: number;
  onChange?: ValueCallback<number>;
}

const Tabs: React.FC<TabsProps> = ({ tabs, defaultIndex = 0, onChange }) => {
  return (
    <TabGroup defaultIndex={defaultIndex} onChange={onChange}>
      <TabList className="flex space-x-1 rounded-t-lg bg-blue-100 p-1">
        {tabs.map((tab, index) => (
          <Tab
            key={index}
            className={({ selected }) =>
              `w-full rounded-t-md px-3 py-2 text-sm font-medium transition-colors ${
                selected ? "bg-white text-blue-600" : "text-gray-700 hover:text-gray-900"
              }`
            }
          >
            {tab.label}
          </Tab>
        ))}
      </TabList>
      <TabPanels className="rounded-b-lg bg-white p-4">
        {tabs.map((tab, index) => (
          <TabPanel key={index}>{tab.content}</TabPanel>
        ))}
      </TabPanels>
    </TabGroup>
  );
};

export default Tabs;
