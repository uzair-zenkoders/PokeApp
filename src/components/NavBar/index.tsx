//react imports
import React, { Fragment } from "react";

//auth(firebase) service
import { userSignOut } from "@/services/auth.service";

//flowbite imports
import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { useRouter } from "next/router";

//react-hot-toast import
import toast, { Toaster } from "react-hot-toast";
import { useAppSelector } from "@/redux/store";

//redux slice method import
import { logOut } from "@/redux/Slices/userSlice";

//redux import(s)
import { useDispatch } from "react-redux";

//////////////////////
const NavBar = () => {
  const imgURL =
    "https://www.clevelanddentalhc.com/wp-content/uploads/2018/03/sample-avatar.jpg";
  //router
  const router = useRouter();
  //dispatch
  const dispatch = useDispatch();

  //redux userState
  const username = useAppSelector(
    (state) => state.persistedReducer.auth.value.username
  );
  const userEmail = useAppSelector(
    (state) => state.persistedReducer.auth.value.userEmail
  );
  const userPhoto = useAppSelector(
    (state) => state.persistedReducer.auth.value.userPhoto
  );
  // console.log("userrr:", username, userEmail, userPhoto);
  //

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
      //@ts-ignore
      dispatch(logOut());
      router.push("./login");
      toast.success("You are signed out!");
    } catch (err) {
      // console.log(err);
      toast.error("Signout failed");
    }
  };

  //if username/diaplay name is empty, we get the username from email
  const getUserName = (email: string): string => {
    const atIndex = email.indexOf("@");
    return email.slice(0, atIndex);
  };

  const displayUsername = username || getUserName(userEmail);

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
            label={<Avatar alt="User" img={userPhoto || imgURL} rounded />}
          >
            <Dropdown.Header>
              <span className="block text-sm">{displayUsername}</span>
              <span className="block truncate text-sm font-medium">
                {userEmail}
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
