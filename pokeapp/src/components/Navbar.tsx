import React from "react";
import Link from "next/link";

const NavBar = () => {
  return (
    <div>
      <nav
        className={`navbar navbar-expand-lg navbar-dark bg-dark`}
        style={{ position: "fixed", top: 0, width: "100%", zIndex: 2 }}
      >
        <div className="container-fluid">
          <Link href="/" passHref={true} legacyBehavior={true}>
            <a className="navbar-brand">pokemon App</a>
          </Link>
          <Link href="/about" passHref={true} legacyBehavior={true}>
            <a className="nav-link">About</a>
          </Link>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
