import { Link } from "react-router-dom";

const NavbarLinks = () => {
  return (
    <>
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
    </>
  );
};

export default NavbarLinks;
