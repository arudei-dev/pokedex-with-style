import type { LucideIcon } from "lucide-react";

export interface Props<K extends string> {
  activeKey: K;
  items: Item<K>[];
  onClickItem?: (key: K) => void;
}

export interface Item<K extends string> {
  key: K;
  icon: LucideIcon;
  text: string;
}
