import { useState } from 'react';

interface Tab {
  id: number;
  label: string;
  key: number;
  children: React.ReactNode;
}

interface TabProps {
  tabs: Tab[];
  initialTabKey: number;
  onChange?: (id: string) => void;
}

export default function useTabs({ tabs, initialTabKey, onChange }: TabProps) {
  const [selectedTabIndex, setSelectedTab] = useState(() => {
    const indexOfInitialTab = tabs.findIndex(
      (tab) => tab.key === initialTabKey,
    );
    return indexOfInitialTab === -1 ? 0 : indexOfInitialTab;
  });

  return {
    tabProps: {
      tabs,
      selectedTabIndex,
      onChange,
      setSelectedTab,
    },
    selectedTab: tabs[selectedTabIndex],
  };
}
