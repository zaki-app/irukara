import {
  CSSProperties,
  FocusEvent,
  PointerEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import classNames from 'classnames';
import { store } from '@/store';
import { setTabsKey } from '@/store/ui/tab/slice';

type Tab = { label: string; key: number; id: number };

interface TabProps {
  selectedTabIndex: number;
  tabs: Tab[];
  setSelectedTab: (input: number) => void;
}

/**
 * 追随するタブ
 * @param
 * @returns
 */
export default function CSSTabs({
  tabs,
  selectedTabIndex,
  setSelectedTab,
}: TabProps) {
  const [buttonRefs, setButtonRefs] = useState<Array<HTMLButtonElement | null>>(
    [],
  );

  useEffect(() => {
    setButtonRefs((prev) => prev.slice(0, tabs.length));
  }, [tabs.length]);

  const [hoveredTabIndex, setHoveredTabIndex] = useState<number | null>(null);
  const [hoveredRect, setHoveredRect] = useState<DOMRect | null>(null);

  const navRef = useRef<HTMLDivElement>(null);
  const navRect = navRef.current?.getBoundingClientRect();

  const selectedRect = buttonRefs[selectedTabIndex]?.getBoundingClientRect();

  const [isInitialHoveredElement, setIsInitialHoveredElement] = useState(true);
  const isInitialRender = useRef(true);

  const onLeaveTabs = () => {
    setIsInitialHoveredElement(true);
    setHoveredTabIndex(null);
  };

  const onEnterTab = (
    e: PointerEvent<HTMLButtonElement> | FocusEvent<HTMLButtonElement>,
    i: number,
  ) => {
    if (!e.target || !(e.target instanceof HTMLButtonElement)) return;

    setHoveredTabIndex((prev) => {
      if (prev != null && prev !== i) {
        setIsInitialHoveredElement(false);
      }

      return i;
    });
    setHoveredRect(e.target.getBoundingClientRect());
  };

  const onSelectTab = (i: number) => {
    setSelectedTab(i);
    // sidebar用にreduxへキーを保存
    store.dispatch(setTabsKey({ key: i }));
  };

  const hoverStyles: CSSProperties = { opacity: 0 };
  if (navRect && hoveredRect) {
    hoverStyles.transform = `translate3d(${hoveredRect.left - navRect.left}px,${
      hoveredRect.top - navRect.top
    }px,0px)`;
    hoverStyles.width = hoveredRect.width;
    hoverStyles.height = hoveredRect.height;
    hoverStyles.opacity = hoveredTabIndex != null ? 1 : 0;
    hoverStyles.transition = isInitialHoveredElement
      ? `opacity 150ms`
      : `transform 150ms 0ms, opacity 150ms 0ms, width 150ms`;
  }

  const selectStyles: CSSProperties = { opacity: 0 };
  if (navRect && selectedRect) {
    selectStyles.width = selectedRect.width * 0.8;
    selectStyles.transform = `translateX(calc(${
      selectedRect.left - navRect.left
    }px + 10%))`;
    selectStyles.opacity = 1;
    selectStyles.transition = isInitialRender.current
      ? `opacity 150ms 150ms`
      : `transform 150ms 0ms, opacity 150ms 150ms, width 150ms`;

    isInitialRender.current = false;
  }

  return (
    <nav
      ref={navRef}
      className='flex flex-shrink-0 justify-start items-center relative z-0 py-2 my-4 overflow-x-visible h-[2rem]'
      onPointerLeave={onLeaveTabs}
    >
      {tabs.map((item) => (
        <button
          key={item.id}
          className={classNames(
            'text-md relative rounded-md flex items-center h-8 px-4 z-20 bg-transparent text-sm text-slate-500 cursor-pointer select-none transition-colors',
            {
              'text-slate-700':
                hoveredTabIndex === item.id || selectedTabIndex === item.id,
            },
          )}
          ref={(el) => {
            buttonRefs[item.id] = el;
          }}
          onPointerEnter={(e) => onEnterTab(e, item.id)}
          onFocus={(e) => onEnterTab(e, item.id)}
          onClick={() => onSelectTab(item.id)}
        >
          {item.label}
        </button>
      ))}
      <div
        className='absolute z-10 top-0 left-0 rounded-md bg-neutral-100 transition-[width]'
        style={hoverStyles}
      />
      {/* 下線 */}
      <div
        className='absolute z-10 bottom-0 left-0 h-[3px] bg-blue-500'
        style={selectStyles}
      />
    </nav>
  );
}
