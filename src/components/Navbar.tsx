//react imports
import React, { Fragment } from "react";

//next imports
import Link from "next/link";

import { userSignOut } from "@/services/auth.service";

//flowbite imports
import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { useRouter } from "next/router";

//react-hot-toast import
import toast, { Toaster } from "react-hot-toast";
import { useAppSelector } from "@/redux/store";
import { useSelector } from "react-redux";

//types interface
interface UserData {
  displayName: string | null;
  email: string;
  tokenId: string;
  photoURL: string | null;
}

// //Props interface
// interface NavBarProps {
//   userData: UserData | null;
// }

// const NavBar: React.FC<NavBarProps> = ({ userData }) => {
const NavBar = () => {
  const router = useRouter();

  //redux userData:
  const username = useAppSelector((state) => state.authReducer.value?.username);
  const userToken = useAppSelector(
    (state) => state.authReducer.value?.userToken
  );
  const userEmail = useAppSelector(
    (state) => state.authReducer.value?.userEmail
  );
  console.log("user:", username, userEmail, userToken);

  //route to add-pokemon
  const handleRouteClick = () => {
    router.push("/add-pokemon");
  };
  //route to add-pokemon
  const handleNavClick = () => {
    router.push("/");
  };

  //Signout button function
  const handleSignOut = async () => {
    try {
      await userSignOut();
      router.push("./auth");
      toast.success("You are signed out!");
    } catch (err) {
      console.log(err);
      toast.error("Signout failed");
    }
  };

  //if username/diaplay name is empty, we get the username from email
  // const getUserName = (email: string): string => {
  //   const atIndex = email.indexOf("@");
  //   return email.slice(0, atIndex !== -1 ? atIndex : undefined);
  // };

  // const displayUsername =
  //   userData?.displayName || getUserName(userData?.email || "");

  return (
    <Fragment>
      <Navbar fluid rounded>
        <Navbar.Brand>
          {/* <Link href="/"> */}
          <div className="flex cursor-pointer" onClick={handleNavClick}>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSK6cstxEi2k6XYT5KOa30fA9NReP1TeBuoI2lY5wQ&s"
              className="mr-3 h-6 sm:h-9"
              alt="PokeApp Logo"
            />
            <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white  hover:text-yellow-400">
              PokeApp
            </span>
          </div>
          {/* </Link> */}
        </Navbar.Brand>

        <Navbar.Collapse>
          <Navbar.Link>
            <div
              className="text-base text-gray-700 dark:text-white ml-4 hover:text-yellow-400 cursor-pointer"
              onClick={handleRouteClick}
            >
              Add Your Pokemon
            </div>
          </Navbar.Link>
        </Navbar.Collapse>
        <div className="flex md:order-2">
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar
                alt="User"
                //   img={
                //     userData?.photoURL ||
                //     `https://www.clevelanddentalhc.com/wp-content/uploads/2018/03/sample-avatar.jpg`
                //   }
                //   rounded
                // />
                img={`https://www.clevelanddentalhc.com/wp-content/uploads/2018/03/sample-avatar.jpg`}
                rounded
              />
            }
          >
            <Dropdown.Header>
              {/* <span className="block text-sm">{displayUsername}</span> */}
              {/* <span className="block text-sm">UserName:{username}</span> */}
              <span className="block text-sm">UserName:</span>
              <span className="block truncate text-sm font-medium">
                {/* {userData?.email} */}
                Email
              </span>
            </Dropdown.Header>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleSignOut}>Sign out</Dropdown.Item>
          </Dropdown>
          <Navbar.Toggle />
        </div>
      </Navbar>
      <Toaster position="top-right" reverseOrder={true} />
    </Fragment>
  );
};

export default NavBar;
