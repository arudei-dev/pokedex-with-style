import { useEffect, useState } from "react";

import { buildContext } from "@/shared/lib/react-factories/build-context";
import useHandler from "@/shared/lib/react-hooks/use-handler";

const LS_MY_TEAM = "pokedex-my-team";

export const [MyTeamProvider, useMyTeamModel] = buildContext("MyTeam")(() => {
  const [myTeamList, $setMyTeamList] = useState<string[]>([]);

  useEffect(() => {
    const lsMyTeamList = JSON.parse(
      localStorage.getItem(LS_MY_TEAM) || "[]",
    ) as string[];

    $setMyTeamList(lsMyTeamList);
  }, []);

  const setMyTeamList = useHandler((list: string[]) => {
    $setMyTeamList(list);
    localStorage.setItem(LS_MY_TEAM, JSON.stringify(list));
  });

  const addToTeam = useHandler((pokemonName) => {
    setMyTeamList([...myTeamList, pokemonName]);
  });

  return {
    myTeamList,
    addToTeam,
  };
});
