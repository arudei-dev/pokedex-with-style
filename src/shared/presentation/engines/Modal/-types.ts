import type { WithChildren } from '@/shared/lib/types/react';

export interface Props extends WithChildren {
  classNameBackdrop?: string;
  classNameChildrenWrapper?: string;

  animationDurationMs?: number;

  closeOnBackdropClick?: boolean;
  isOpened?: boolean;

  onClose?: () => void;
}
