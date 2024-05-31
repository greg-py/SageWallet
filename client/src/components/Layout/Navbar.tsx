import { Link } from "react-router-dom";
import { APP_NAME, MONTHS } from "../../config/constants";
import LoadingSpinner from "./LoadingSpinner";
import { useAuth } from "../../hooks/useAuth";
import { useFilter } from "../../hooks/useFilter";

const Navbar = () => {
  const { loading, user, logoutUser } = useAuth();
  const {
    filterOptions,
    filterMonth,
    setFilterMonth,
    filterYear,
    setFilterYear,
  } = useFilter();

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedMonth = e.target.value;
    const monthIndex = MONTHS.indexOf(selectedMonth);
    setFilterMonth(monthIndex);
  };

  if (loading) {
    return <LoadingSpinner />;
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
          {filterOptions &&
            Object.keys(filterOptions).map((year) => {
              return <option key={year}>{year}</option>;
            })}
        </select>
        {user && (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full bg-accent"></div>
            </div>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow-xl menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <Link to="/team">Team</Link>
              </li>
              <li>
                <a onClick={logoutUser}>Logout</a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
