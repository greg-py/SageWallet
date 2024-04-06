"use client";

import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { useAuth0 } from "@auth0/auth0-react";

import LoginButton from "../auth/LoginButton";
import LoadingSpinner from "./LoadingSpinner";

const ProfileNavbar = () => {
  const { user, isAuthenticated, isLoading, logout } = useAuth0();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const handleLogout = () => {
    logout({ logoutParams: { returnTo: window.location.origin } });
  };

  const navItems = [
    { label: "Dashboard", href: "/" },
    { label: "Transactions", href: "/transactions" },
  ];

  return (
    <Navbar fluid rounded className="bg-gray-300">
      <Navbar.Brand href="/">
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Banking App
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        {isAuthenticated && user ? (
          <>
            <Dropdown
              arrowIcon={false}
              inline
              label={<Avatar alt="User settings" img={user.picture} rounded />}
            >
              <Dropdown.Header>
                <span className="block truncate text-sm font-medium">
                  {user.email}
                </span>
              </Dropdown.Header>
              <Dropdown.Item>Profile</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={() => handleLogout()}>
                Sign out
              </Dropdown.Item>
            </Dropdown>
            <Navbar.Toggle />
          </>
        ) : (
          <LoginButton />
        )}
      </div>
      <Navbar.Collapse>
        {navItems.length &&
          navItems.map((item) => {
            return (
              <Navbar.Link key={item.label} href={item.href}>
                {item.label}
              </Navbar.Link>
            );
          })}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default ProfileNavbar;
