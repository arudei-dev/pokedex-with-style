"use client";

import type { WithChildren } from "@/shared/lib/types/react";

import { BottomSheetController } from "./bottom-sheet";
import { InfraEventsProvider } from "./events";

export function Infra({ children }: WithChildren) {
  return (
    <InfraEventsProvider>
      {children}
      <BottomSheetController />
    </InfraEventsProvider>
  );
}
