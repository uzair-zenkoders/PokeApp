// // React Imports
import { FC, Fragment, useEffect, useState } from "react";
import NavBar from "./components/Navbar";
import { useRouter } from "next/router";

interface IHigherOrderComponentProps {
  children: React.ReactElement<any, any>;
}

const HigherOrderComponent: FC<IHigherOrderComponentProps> = ({ children }) => {
  const router = useRouter();
  const excludeNavbarRoutes = ["/auth"]; // Add routes where you want to exclude the NavBar

  const shouldShowNavBar = !excludeNavbarRoutes.some((route) =>
    router.pathname.startsWith(route)
  );

  return (
    <Fragment>
      {shouldShowNavBar && <NavBar />}
      {children}
    </Fragment>
  );
};

export default HigherOrderComponent;
