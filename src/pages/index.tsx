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

//serverSideProps
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);

  // Access cookies in the server-side code
  const cookies = new Cookies(context.req.headers.cookie);
  const userData = cookies.get("userData");
  return {
    props: {
      userData: userData || null, // Assign the userData object directly to props
    },
  };
}
