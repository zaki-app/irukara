type Tab = { label: string; key: number; id: number };

interface TabProps {
  selectedTabIndex: number;
  tabs: Tab[];
  setSelectedTab: (input: number) => void;
}

export default function MenuTab({
  tabs,
  selectedTabIndex,
  setSelectedTab,
}: TabProps) {
  console.log();

  return <div className='bg-gray-300 w-full'>tabが入ります</div>;
}
