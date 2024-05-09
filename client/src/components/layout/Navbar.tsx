import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import { FilterOptions } from "../../models/filters";
import { MONTHS } from "../../config/constants";

interface NavbarProps {
  filterMonth: number;
  setFilterMonth: React.Dispatch<React.SetStateAction<number>>;
  filterYear: number;
  setFilterYear: React.Dispatch<React.SetStateAction<number>>;
  filterOptions: FilterOptions;
}

const Navbar = ({
  filterMonth,
  setFilterMonth,
  filterYear,
  setFilterYear,
  filterOptions,
}: NavbarProps) => {
  const { isAuthenticated, user, logout } = useAuth0();

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedMonth = e.target.value;
    const monthIndex = MONTHS.indexOf(selectedMonth);
    setFilterMonth(monthIndex);
  };

  const handleLogout = () => {
    logout({ logoutParams: { returnTo: window.location.origin } });
  };

  return (
    <div className="navbar bg-base-100 justify-between">
      <p className="btn btn-ghost text-xl">Budgee</p>
      <div className="space-x-2">
        <select
          className="select w-52 bg-gray-300 text-base-100"
          value={MONTHS[filterMonth] ?? ""}
          onChange={(e) => handleMonthChange(e)}
        >
          <option disabled>Month</option>
          {MONTHS.map((month) => {
            return <option key={month}>{month}</option>;
          })}
        </select>
        <select
          className="select w-52 bg-gray-300 text-base-100"
          value={filterYear}
          onChange={(e) => setFilterYear(parseInt(e.target.value))}
        >
          <option disabled>Year</option>
          {Object.keys(filterOptions) &&
            Object.keys(filterOptions).map((year) => {
              return <option key={year}>{year}</option>;
            })}
        </select>
      </div>
      <div>
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
  );
};

export default Navbar;
