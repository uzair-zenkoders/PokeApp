import React from "react";
import loading from "./loading.gif";
import Image from "next/image";

const Spinner = (props: any) => {
  return (
    <div className="flex justify-center">
      <Image src={loading} alt="Loading" />
    </div>
  );
};

export default Spinner;
