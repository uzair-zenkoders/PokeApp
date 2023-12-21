//react imports
import { ChangeEvent, Fragment, useEffect, useState } from "react";
import { getAllPokemon } from "@/services/pokemon.service";

//local Components Import
import Card from "../components/Card";
import SearchBar from "../components/SearchBar";

//type(s) import
import { IPokemonData } from "@/types/Pokemon.interface";

//HomeProps interface
interface HomeProps {
  pokemonData: IPokemonData[];
}

import { searchPokemonByName } from "@/services/pokemon.service";

//////////////////////////////////////////////////////////
export default function Home({ pokemonData }: HomeProps) {
  // const [pokeData, setPokeData] = useState<IPokemonData[]>(pokemonData);
  const pokeData: IPokemonData[] = (pokemonData);

  //searchingLoader
  const [loader, setLoader] = useState<boolean>(false)

  //searchBar value
  const [searchValue, setSearchValue] = useState("");
  // const [filteredData, setFilteredData] = useState<IPokemonData[]>([]);
  const [filteredData, setFilteredData] = useState<IPokemonData[]>([]);


  const searchPoke = async () => {
    const searched = searchValue && await searchPokemonByName(searchValue)
    if (searched.length >= 0) {
      setFilteredData(searched as IPokemonData[])
      setLoader(false)
    }else {
      setFilteredData([])
    }
    
    setLoader(false)
    console.log("searched:", searched)
  }

  useEffect(() => {
    searchPoke();
  },
    [searchValue])

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
    setLoader(true)
  };

  return (
    <Fragment>
      <SearchBar onChange={handleSearch} value={searchValue} />
      <div className="my-12 mx-40 sm:px-5 sm:flex sm:justify-center">
      
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
            {/* searched cards */}
          {
            !loader && searchValue && filteredData.length > 0 ? (
              filteredData.map((item: IPokemonData, index: number) => (
                <div className="w-full md:w-1/3 px-4 mb-12" key={item.id}>
                  <Card title={item.name} id={item.id} />
                  {(index + 1) % 3 === 0 && <div className="w-full"></div>}
                </div>
              ))
            ) : (loader && 
              <p>Loading...</p>
            )
          }

        </div>
      </div></div>
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
