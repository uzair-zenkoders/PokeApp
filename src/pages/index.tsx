//react imports
import { ChangeEvent, Fragment, useState } from "react";
import { getAllPokemon } from "@/services/pokemon.service";

//local Components Import
import Card from "@/components/Card";
import NewSearchBar from "@/components/NewSearchBar";

//type(s) import
import { IPokemonData } from "@/types/Pokemon.interface";

//HomeProps interface
interface HomeProps {
  pokemonData: IPokemonData[];
}

export default function Home({ pokemonData }: HomeProps) {
  const [pokeData, setPokeData] = useState<IPokemonData[]>(pokemonData);

  //searchBar value
  const [searchValue, setSearchValue] = useState("");
  const [filteredData, setFilteredData] = useState<IPokemonData[]>([]);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    setSearchValue(searchValue);
    const targetItem = searchValue.toLowerCase();
    // Filter the results based on the search value
    const filteredData = pokeData.filter((item: IPokemonData) =>
      item.name.toLowerCase().includes(targetItem)
    );
    setFilteredData(filteredData);
  };

  return (
    <Fragment>
      <div className="my-12 mx-40">
        {/* searchBar */}
        {/* <SearchBar onChange={handleSearch} value={searchValue} /> */}
        <NewSearchBar onChange={handleSearch} value={searchValue} />
      </div>
      {/* mapping cards */}
      <div className="container mx-auto px-4 my-10">
        <div className="flex flex-wrap -mx-4">
          {!searchValue &&
            pokeData.map((item: IPokemonData, index: number) => (
              <div className="w-full md:w-1/3 px-4 mb-12" key={item.id}>
                <Card title={item.name} id={item.id} />
                {(index + 1) % 3 === 0 && <div className="w-full"></div>}
              </div>
            ))}
          {searchValue &&
            filteredData.map((item: IPokemonData, index: number) => (
              <div className="w-full md:w-1/3 px-4 mb-12" key={item.id}>
                <Card title={item.name} id={item.id} />
                {(index + 1) % 3 === 0 && <div className="w-full"></div>}
              </div>
            ))}
        </div>
      </div>
      {/* mapping cards */}
    </Fragment>
  );
}

//serverSideProps//
export async function getServerSideProps() {
  const pokeData = await getAllPokemon();
  return {
    props: {
      pokemonData: pokeData,
    },
  };
}
