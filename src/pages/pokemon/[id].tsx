//firebase service import
import DetailsCard from "@/components/DetailCard";
import { getPokemonbyId } from "@/services/pokemon.service";

//next import(s)
import { GetServerSidePropsContext } from "next";

//react import(s)
import React, { Fragment, useEffect, useState } from "react";

const detailsPage = ({
  id,
  pokiData: pokeData,
}: {
  id: string;
  pokiData: any;
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
  const id = context.query.id;
  const pokiData = await getPokemonbyId(id);
  console.log("pk", id, pokiData);
  return {
    props: { id: id, pokiData },
  };
}
