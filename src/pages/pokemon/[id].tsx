import { GetServerSidePropsContext } from "next";
import React from "react";

const detailsPage = ({ id }: { id: string }) => {
  return <div>{id}</div>;
};

export default detailsPage;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const id = context.query.id;
  return {
    props: { id },
  };
}
