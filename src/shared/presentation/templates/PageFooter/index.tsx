import { cn } from "@/shared/lib/tailwind/cn";

import type { Props } from "./-types";

export default function PageFooter<K extends string>(props: Props<K>) {
  const { activeKey, items, onClickItem } = props;

  return (
    <div
      className={cn(
        "absolute bottom-0 left-0 right-0 w-full px-6 py-2 bg-white shadow-2xl/5 border-t z-[10]",
        "flex items-center justify-center gap-x-1",
      )}
    >
      {items.map((it) => {
        const { key, icon: Icon, text } = it;

        const isActive = key === activeKey;

        return (
          <button
            key={key}
            type="button"
            className={cn(
              "p-3 flex flex-col items-center gap-y-1",
              isActive && "bg-red-50 rounded text-red-500",
            )}
            onClick={() => onClickItem?.(key)}
          >
            <Icon />
            {text}
          </button>
        );
      })}
    </div>
  );
}
