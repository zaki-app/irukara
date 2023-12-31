interface Tab {
  label: string;
  key: number;
  id: number;
  icon: React.ReactNode;
}

interface TabProps {
  selectedTabIndex: number;
  tabs: Tab[];
  setSelectedTab: (input: number) => void;
}

export default function BottomTab({
  tabs,
  selectedTabIndex,
  setSelectedTab,
}: TabProps) {
  console.log('引数です', tabs);
  return (
    <div className='w-full bg-gray-200 flex justify-center items-center gap-3 py-3 rounded-full'>
      {tabs.map((item) => (
        <div
          key={item.id}
          className='flex-1 flex flex-col justify-center items-center cursor-pointer'
        >
          <div className='text-[1.5rem]'>{item.icon}</div>
          <span className='text-xs md:text-[0.7rem]'>{item.label}</span>
        </div>
      ))}
    </div>
  );
}
