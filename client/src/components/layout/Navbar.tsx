import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { useAuth0 } from "@auth0/auth0-react";

const ProfileNavbar = () => {
  const { isAuthenticated, user, logout } = useAuth0();

  const handleLogout = () => {
    logout({ logoutParams: { returnTo: window.location.origin } });
  };

  return (
    <Navbar rounded fluid className="">
      <Navbar.Brand href="/">
        <span className="self-center whitespace-nowrap text-xl font-semibold">
          Budget
        </span>
      </Navbar.Brand>
      {isAuthenticated && user && (
        <div className="flex md:order-2">
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
          <Navbar.Toggle className="text-slate-300" />
        </div>
      )}
    </Navbar>
  );
};

export default ProfileNavbar;
