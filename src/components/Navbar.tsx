//react imports
import React from "react";

//next imports
import Link from "next/link";

import { userSignOut } from "@/services/auth.service";

//flowbite imports
import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { useRouter } from "next/router";

//if username/diaplay name is empty, we get the username from email
const getUserName = (email: string): string => {
  const atIndex = email.indexOf("@");
  return email.slice(0, atIndex !== -1 ? atIndex : undefined);
};

//types interface
interface UserData {
  displayName: string | null;
  email: string;
  tokenId: string;
  photoURL: string | null;
}

interface NavBarProps {
  userData: UserData | null;
}

const NavBar: React.FC<NavBarProps> = ({ userData }) => {
  const router = useRouter();
  const handleSignOut = async () => {
    await userSignOut();
    router.push("./auth");
  };

  const displayUsername =
    userData?.displayName || getUserName(userData?.email || "");

  return (
    <Navbar fluid rounded>
      <Navbar.Brand href="https://flowbite-react.com">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSK6cstxEi2k6XYT5KOa30fA9NReP1TeBuoI2lY5wQ&s"
          className="mr-3 h-6 sm:h-9"
          alt="PokeApp Logo"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          PokeApp
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar
              alt="User settings"
              img={
                userData?.photoURL ||
                `https://www.clevelanddentalhc.com/wp-content/uploads/2018/03/sample-avatar.jpg`
              }
              rounded
            />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">{displayUsername}</span>
            <span className="block truncate text-sm font-medium">
              {userData?.email}
            </span>
          </Dropdown.Header>
          <Dropdown.Divider />
          <Dropdown.Item onClick={handleSignOut}>Sign out</Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle />
      </div>
    </Navbar>
  );
};

export default NavBar;
