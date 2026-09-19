import { SearchIcon } from "lucide-react";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/shared/presentation/molecules/InputGroup";

import { CatalogProvider, useCatalogModel } from "../../-model";
import PokemonItem from "../PokemonItem";

export default function Catalog() {
  return (
    <CatalogProvider>
      <View />
    </CatalogProvider>
  );
}

function View() {
  const { pokemonList, searchQuery, setSearchQuery } = useCatalogModel();

  return (
    <div className="flex flex-col p-6">
      <h2 className="text-4xl font-bold pb-4">Catalog</h2>

      <InputGroup className="*:text-xl! h-12 rounded-lg">
        <InputGroupInput
          className="h-full pl-2!"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>
      </InputGroup>

      {pokemonList.$status === "success" ? (
        <div className="grid grid-cols-2 gap-2 pt-4">
          {pokemonList.pokemons.map((it) => (
            <PokemonItem key={it} pokemonName={it} />
          ))}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
