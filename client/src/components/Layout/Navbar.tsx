import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import { MONTHS } from "../../config/constants";
import { useQuery } from "@tanstack/react-query";
import { filterOptionsQuery } from "../../api/queries";
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
  const { isAuthenticated, user, logout, getAccessTokenSilently } = useAuth0();
  const userId = user?.sub || "";

  // Queries
  const {
    isPending: isFilterOptionsPending,
    error: filterOptionsError,
    data: filterOptions,
  } = useQuery(filterOptionsQuery(userId, getAccessTokenSilently));

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedMonth = e.target.value;
    const monthIndex = MONTHS.indexOf(selectedMonth);
    setFilterMonth(monthIndex);
  };

  const handleLogout = () => {
    logout({ logoutParams: { returnTo: window.location.origin } });
  };

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
    <div className="navbar bg-primary text-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost xl:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link to="/">Dashboard</Link>
            </li>
            <li>
              <Link to="/balances">Balances</Link>
            </li>
            <li>
              <Link to="/budget">Budget</Link>
            </li>
            <li>
              <Link to="/transactions">Transactions</Link>
            </li>
            <li>
              <Link to="/income">Income</Link>
            </li>
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">ProsperFund</a>
      </div>
      <div className="navbar-center hidden xl:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/">Dashboard</Link>
          </li>
          <li>
            <Link to="/balances">Balances</Link>
          </li>
          <li>
            <Link to="/budget">Budget</Link>
          </li>
          <li>
            <Link to="/transactions">Transactions</Link>
          </li>
          <li>
            <Link to="/income">Income</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end text-black">
        <div className="flex-1 flex justify-end space-x-2 items-center">
          <div className="flex flex-row space-x-2">
            <select
              className="select w-24 xl:w-52 bg-base-200"
              value={MONTHS[filterMonth] ?? ""}
              onChange={(e) => handleMonthChange(e)}
            >
              <option disabled>Month</option>
              {MONTHS.map((month) => {
                return <option key={month}>{month}</option>;
              })}
            </select>
            <select
              className="select w-24 xl:w-52 bg-base-200"
              value={filterYear}
              onChange={(e) => setFilterYear(parseInt(e.target.value))}
            >
              <option disabled>Year</option>
              {Object.keys(filterOptions).map((year) => {
                return <option key={year}>{year}</option>;
              })}
            </select>
          </div>
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
    </div>
  );
};

export default Navbar;
