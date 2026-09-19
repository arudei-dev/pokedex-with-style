/** biome-ignore-all lint/performance/noImgElement: External sources */
import { useEffect, useState } from "react";

import type { Pokemon } from "pokenode-ts";

import { useMyTeamModel } from "@/shared/entities/my-team";
import { f } from "@/shared/lib/corefunc/fn";
import {
  capitalizeEveryFirstLetter,
  kebabCaseToPascalCase,
} from "@/shared/lib/corefunc/string";
import type { Response } from "@/shared/lib/types/response";
import { Button } from "@/shared/presentation/atoms/Button";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/shared/presentation/atoms/Card";

import { pokedexApi } from "../../-config";

interface Props {
  pokemonName: string;
}

export default function PokemonItem(props: Props) {
  const { pokemonName } = props;

  const { myTeamList, addToTeam } = useMyTeamModel();

  const [response, setResponse] = useState<Response<Pokemon>>({
    $status: "loading",
  });

  useEffect(() => {
    f(async () => {
      const response = await pokedexApi.pokemon.getPokemonByName(pokemonName);

      setResponse({
        $status: "success",
        ...response,
      });
    });
  }, [pokemonName]);

  if (response.$status !== "success") {
    return <div className="w-full h-100 bg-gray-300 rounded-lg" />;
  }

  const isInMyTeaam = myTeamList.includes(response.name);

  return (
    <Card className="flex flex-col items-center gap-0 pb-4">
      <img
        className="w-16 h-16"
        src={response.sprites.front_default || ""}
        alt="Sprite"
      />

      <CardContent className="flex flex-col items-center">
        <h4 className="text-xl font-semibold">
          {capitalizeEveryFirstLetter(response.name)}
        </h4>

        <div className="flex items-center justify-center gap-2">
          {response.abilities.map((it) => (
            <div key={it.ability.name} className="px-2 py-1 border bg-gray-100">
              {kebabCaseToPascalCase(it.ability.name)}
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex-col w-full pt-4">
        {isInMyTeaam ? (
          <Button disabled type="submit" className="w-full">
            In Team
          </Button>
        ) : (
          <Button
            type="submit"
            className="w-full"
            onClick={() => addToTeam(response.name)}
          >
            Add to Team
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
