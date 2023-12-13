//firebase service import
import DetailsCard from "@/components/DetailCard";
import { getPokemonbyId } from "@/services/pokemon.service";

//next import(s)
import { GetServerSidePropsContext, NextPage } from "next";

//react import(s)
import React, { Fragment, useState } from "react";

//type import
import { IPokeData } from "@/types/PokeData.interface";

interface detailsPageProps {
  id: string;
  pokiData: IPokeData;
}

const DetailsPage: NextPage<detailsPageProps> = ({
  id,
  pokiData: pokeData,
}) => {
  const [pokiData, setPokiData] = useState(pokeData);

  return (
    <Fragment>
      <DetailsCard id={id} pokeData={pokiData} />
    </Fragment>
  );
};

export default DetailsPage;

//serverSide Props
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
