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

//userData interface
interface UserData {
  displayName: string | null;
  email: string;
  tokenId: string;
  photoURL: string | null;
}
//userData interface
interface Pokemon {
  id: string;
  name: string;
  height: number;
  weight: number;
  baseExperience: string;
}

//HomeProps interface
interface HomeProps {
  userData: UserData | null;
  pokeData: Pokemon[];
}

export default function Home({ userData, pokeData: pokemonData }: HomeProps) {
  const [pokeData, setPokeData] = useState(pokemonData);

  console.log(pokeData);

  return (
    <Fragment>
      <NavBar userData={userData} />
      {/* mapping cards */}
      <div className="container mx-auto px-4 my-10">
        <div className="flex flex-wrap -mx-4">
          {pokeData.map((item, index) => (
            <div className="w-full md:w-1/3 px-4 mb-8" key={item.id}>
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
