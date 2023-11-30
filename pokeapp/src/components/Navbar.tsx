//react imports
import React from "react";

//next imports
import Link from "next/link";

import { userSignOut } from "@/services/auth.service";

//flowbite imports
import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { useRouter } from "next/router";

const NavBar = () => {
  const router = useRouter();
  const handleSignOut = async () => {
    await userSignOut();
    router.push("./auth");
  };

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
              img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
              rounded
            />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">Bonnie Green</span>
            <span className="block truncate text-sm font-medium">
              name@flowbite.com
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
