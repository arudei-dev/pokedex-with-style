import type { WithChildren } from '@/shared/lib/types/react';

export interface Props extends WithChildren {
  classNameWrapper?: string;
  classNameChildrenWrapper?: string;

  isOpened?: boolean;
  animationDurationMs?: number;

  enableFirstAnimation?: boolean;
}
