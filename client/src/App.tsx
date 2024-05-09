import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import Layout from "./components/Layout/Layout";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Balances from "./pages/Balances";
import Budget from "./pages/Budget";
import Income from "./pages/Income";
import Profile from "./pages/Profile";
import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useQuery } from "@tanstack/react-query";
import { filterOptionsQuery } from "./api/queries";
import LoadingSpinner from "./components/Layout/LoadingSpinner";

function App() {
  // User authentication
  const { user } = useAuth0();
  const userId = user?.sub || "";

  // Page state
  const currentMonthIndex = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const [filterMonth, setFilterMonth] = useState(currentMonthIndex);
  const [filterYear, setFilterYear] = useState(currentYear);

  const {
    isPending: isFilterOptionsPending,
    error: filterOptionsError,
    data: filterOptions,
  } = useQuery(filterOptionsQuery(userId));

  if (isFilterOptionsPending) {
    return <LoadingSpinner />;
  }

  if (filterOptionsError) {
    return (
      <div className="mx-auto max-w-screen-2xl text-center">
        <p>There was an error loading data</p>
      </div>
    );
  }

  return (
    <Router>
      <Layout
        filterMonth={filterMonth}
        setFilterMonth={setFilterMonth}
        filterYear={filterYear}
        setFilterYear={setFilterYear}
        filterOptions={filterOptions}
      >
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard filterMonth={filterMonth} filterYear={filterYear} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/balances"
            element={
              <ProtectedRoute>
                <Balances />
              </ProtectedRoute>
            }
          />
          <Route
            path="/budget"
            element={
              <ProtectedRoute>
                <Budget filterMonth={filterMonth} filterYear={filterYear} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/transactions"
            element={
              <ProtectedRoute>
                <Transactions />
              </ProtectedRoute>
            }
          />
          <Route
            path="/income"
            element={
              <ProtectedRoute>
                <Income />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
