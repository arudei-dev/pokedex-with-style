import { useEffect, useState } from "react";

import { f } from "@/shared/lib/corefunc/fn";
import { buildContext } from "@/shared/lib/react-factories/build-context";
import { useDebounceValue } from "@/shared/lib/react-hooks/use-debounce";
import type { Response } from "@/shared/lib/types/response";

import { pokedexApi } from "../-config";

export const [CatalogProvider, useCatalogModel] = buildContext("Catalog")(
  () => {
    const [pokemonList, setPokemonList] = useState<
      Response<{ pokemons: string[] }>
    >({
      $status: "loading",
    });

    const [searchQuery, setSearchQuery] = useState("");

    const [debouncedSearchQuery] = useDebounceValue(searchQuery);

    useEffect(() => {
      f(async () => {
        const response = await pokedexApi.pokemon.listPokemons();

        const mapped = response.results
          .map((it) => it.name)
          .filter((it) =>
            debouncedSearchQuery
              ? it
                  .toLocaleLowerCase()
                  .includes(debouncedSearchQuery.toLocaleLowerCase())
              : true,
          );

        setPokemonList({
          $status: "success",
          pokemons: mapped,
        });
      });
    }, [debouncedSearchQuery]);

    return {
      pokemonList,

      searchQuery,
      setSearchQuery,
    };
  },
);
