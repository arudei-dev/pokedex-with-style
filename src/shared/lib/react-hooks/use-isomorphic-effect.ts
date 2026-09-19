import { useEffect, useLayoutEffect } from "react";

import { isBrowser } from "@/shared/lib/corefunc/browser";

export const useIsomorphicEffect = isBrowser() ? useLayoutEffect : useEffect;
