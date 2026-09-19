import type { ReactNode } from "react";

export type BottomSheetEvents = {
  open: OpenPayload;
  close: null;
};

export interface OpenPayload {
  title: string;
  content: ReactNode;
}
