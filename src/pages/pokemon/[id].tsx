//firebase service import
import DetailsCard from "@/components/DetailCard";
import { getPokemonbyId } from "@/services/pokemon.service";

//next import(s)
import { GetServerSidePropsContext, NextPage } from "next";

//react import(s)
import React, { Fragment, useState } from "react";

interface IPokeData {
  baseExperience: string;
  height: string;
  name: string;
  weight: string;
}

interface detailsPageProps {
  id: string;
  pokiData: IPokeData;
}

const detailsPage: NextPage<detailsPageProps> = ({
  id,
  pokiData: pokeData,
}) => {
  const [pokiData, setPokiData] = useState(pokeData);

  console.log(pokiData);

  return (
    <Fragment>
      <DetailsCard id={id} pokeData={pokiData} />
    </Fragment>
  );
};

export default detailsPage;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const id = context.query.id as string;
  const pokiData = await getPokemonbyId(id);
  if (!pokiData) {
    // If pokiData is undefined or empty, redirect to "/"
    return {
      redirect: {
        destination: "/",
        permanent: false, // Set to false if you want temporary redirection
      },
    };
  }

  return {
    props: { id, pokiData },
  };
}
