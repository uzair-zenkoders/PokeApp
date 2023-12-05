import React from "react";

const index = () => {
  return <div>index</div>;
};

export default index;

export async function getServerSideProps() {
  return {
    redirect: { permanent: false, destination: "/" },
  };
}
