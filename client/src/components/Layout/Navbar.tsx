import { Link } from "react-router-dom";
import { APP_NAME, MONTHS } from "../../config/constants";
import { useQuery } from "@tanstack/react-query";
import { filterOptionsQuery } from "../../api/queries";
import { useAuth0 } from "@auth0/auth0-react";
import LoadingSpinner from "./LoadingSpinner";

interface NavbarProps {
  filterMonth: number;
  setFilterMonth: React.Dispatch<React.SetStateAction<number>>;
  filterYear: number;
  setFilterYear: React.Dispatch<React.SetStateAction<number>>;
}

const Navbar = ({
  filterMonth,
  setFilterMonth,
  filterYear,
  setFilterYear,
}: NavbarProps) => {
  // User authentication
  const { isAuthenticated, user, logout, getAccessTokenSilently } = useAuth0();
  const userId = user?.sub || "";

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedMonth = e.target.value;
    const monthIndex = MONTHS.indexOf(selectedMonth);
    setFilterMonth(monthIndex);
  };

  const handleLogout = () => {
    logout({ logoutParams: { returnTo: window.location.origin } });
  };

  // Queries
  const {
    isPending: isFilterOptionsPending,
    error: filterOptionsError,
    data: filterOptions,
  } = useQuery(filterOptionsQuery(userId, getAccessTokenSilently));

  // Show loading spinner if queries are pending
  if (isFilterOptionsPending) {
    return <LoadingSpinner />;
  }

  // Show error message if query has error
  if (filterOptionsError) {
    return (
      <div className="mx-auto max-w-screen-2xl text-center">
        <p>There was an error loading data</p>;
      </div>
    );
  }

  return (
    <div className="w-full navbar bg-primary text-base-100 flex justify-between">
      <label
        htmlFor="sagewallet-drawer"
        aria-label="open sidebar"
        className="btn btn-square btn-ghost w-fit px-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="inline-block w-6 h-6 stroke-current"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          ></path>
        </svg>
        <div className="hidden text-xl lg:block">{APP_NAME}</div>
      </label>
      <div className="text-base-content space-x-2">
        <select
          className="select w-24 lg:w-52 bg-base-100"
          value={MONTHS[filterMonth] ?? ""}
          onChange={(e) => handleMonthChange(e)}
        >
          <option disabled>Month</option>
          {MONTHS.map((month) => {
            return <option key={month}>{month}</option>;
          })}
        </select>
        <select
          className="select w-24 lg:w-52 bg-base-100"
          value={filterYear}
          onChange={(e) => setFilterYear(parseInt(e.target.value))}
        >
          <option disabled>Year</option>
          {Object.keys(filterOptions).map((year) => {
            return <option key={year}>{year}</option>;
          })}
        </select>
        {isAuthenticated && user && (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img alt="User avatar" src={user.picture} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow-xl menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <a onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
