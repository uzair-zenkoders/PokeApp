//local components import
import NavBar from "@/components/Navbar";

//cookies import
import Cookies from "universal-cookie";

//serverside imports
// import { getSession } from "next-auth/react";
import { GetServerSidePropsContext } from "next";

//react imports
import { Fragment, useEffect, useState } from "react";
import { getAllPokemon } from "@/services/pokemon.service";

//local Card Import
import Card from "@/components/Card";
import SearchBar from "@/components/SearchBar";

//userData interface
interface UserData {
  displayName: string | null;
  email: string;
  tokenId: string;
  photoURL: string | null;
}
//userData interface
interface IPokemon {
  id: string;
  name: string;
  height: number;
  weight: number;
  baseExperience: string;
}

//HomeProps interface
interface HomeProps {
  userData: UserData | null;
  pokeData: IPokemon[];
}

export default function Home({ userData, pokeData: pokemonData }: HomeProps) {
  const [pokeData, setPokeData] = useState(pokemonData);

  //searchBar value
  const [searchValue, setSearchValue] = useState("");
  const [filteredData, setFilteredData] = useState<IPokemon[]>([]);

  const handleSearch = (e: any) => {
    const searchValue = e.target.value; // Convert input to lowercase for case-insensitive search
    setSearchValue(searchValue); // Update the value state
    const targetItem = searchValue.toLowerCase();

    // Filter the results based on the search value
    const filteredData = pokeData.filter((item) =>
      item.name.toLowerCase().includes(targetItem)
    );
    setFilteredData(filteredData);
  };

  console.log(filteredData);

  return (
    <Fragment>
      <NavBar userData={userData} />
      <div className="my-12 mx-40">
        <SearchBar onChange={handleSearch} value={searchValue} />
      </div>
      {/* mapping cards */}
      <div className="container mx-auto px-4 my-10">
        <div className="flex flex-wrap -mx-4">
          {!searchValue &&
            pokeData.map((item, index) => (
              <div className="w-full md:w-1/3 px-4 mb-12" key={item.id}>
                <Card title={item.name} id={item.id} />
                {(index + 1) % 3 === 0 && <div className="w-full"></div>}
              </div>
            ))}
          {searchValue &&
            filteredData.map((item, index) => (
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

//serverSideProps
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const pokeData = await getAllPokemon();
  console.log(pokeData);
  // Access cookies in the server-side code
  const cookies = new Cookies(context.req.headers.cookie);
  const userData = cookies.get("userData");
  return {
    props: {
      userData: userData || null,
      pokeData: pokeData,
    },
  };
}
