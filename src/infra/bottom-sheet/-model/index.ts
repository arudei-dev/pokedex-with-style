import { registerInfraEvents } from "@/infra/events";

import type { BottomSheetEvents } from "../-rules";

const [useEmit, useSubscribe] = registerInfraEvents<
  "bottom-sheet",
  BottomSheetEvents
>();

export const BottomSheetModel = {
  useEmit,
  useSubscribe,
};
