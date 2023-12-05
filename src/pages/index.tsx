//local components import
import NavBar from "@/components/Navbar";

//cookies import
import Cookies from "universal-cookie";

//serverside imports
import { getSession } from "next-auth/react";
import { GetServerSidePropsContext } from "next";

//react imports
import { Fragment } from "react";

interface UserData {
  displayName: string | null;
  email: string;
  tokenId: string;
  photoURL: string | null;
  // Add any other necessary fields
}

interface HomeProps {
  userData: UserData | null;
}

export default function Home({ userData }: HomeProps) {
  return (
    <Fragment>
      <NavBar userData={userData} />
    </Fragment>
  );
}

// Server side props
// Request ==> cookies ==> token
// admin auth const decode
// fail redirect login
// success / ==> props ==> data
// import { auth } from "firebase-admin";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);

  // Access cookies in the server-side code
  const cookies = new Cookies(context.req.headers.cookie);
  const userData = cookies.get("userData");
  console.log(userData);
  // console.log(session);

  // if (session) {
  //   return {
  //     redirect: {
  //       destination: "/",
  //       permanent: false,
  //     },
  //   };
  // }

  return {
    props: {
      userData: userData || null, // Assign the userData object directly to props
    },
  };
}
