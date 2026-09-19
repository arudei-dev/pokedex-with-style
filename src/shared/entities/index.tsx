import type { WithChildren } from "../lib/types/react";
import { MyTeamProvider } from "./my-team";

export default function EntitiesModelProvider({ children }: WithChildren) {
  return <MyTeamProvider>{children}</MyTeamProvider>;
}
