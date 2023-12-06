//local components import
import NavBar from "@/components/Navbar";

//cookies import
import Cookies from "universal-cookie";

//serverside imports
import { getSession } from "next-auth/react";
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
      {/* mapping card */}
      <div className="row ">
        {pokeData.map((item) => (
          <div className="col-md-4 my-4" key={item.id}>
            <Card title={item.name} id={item.id} />
          </div>
        ))}
      </div>
      {/* mapping card */}
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
      userData: userData || null, // Assign the userData object directly to props
      pokeData: pokeData,
    },
  };
}
