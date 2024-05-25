import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Balances from "./pages/Balances";
import Budget from "./pages/Budget";
import Income from "./pages/Income";
import Profile from "./pages/Profile";
import { useState } from "react";
import Layout from "./components/Layout/Layout";

function App() {
  // Page state
  const currentMonthIndex = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const [filterMonth, setFilterMonth] = useState(currentMonthIndex);
  const [filterYear, setFilterYear] = useState(currentYear);

  return (
    <Router>
      <Layout
        filterMonth={filterMonth}
        setFilterMonth={setFilterMonth}
        filterYear={filterYear}
        setFilterYear={setFilterYear}
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
                <Transactions
                  filterMonth={filterMonth}
                  filterYear={filterYear}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/income"
            element={
              <ProtectedRoute>
                <Income filterMonth={filterMonth} filterYear={filterYear} />
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
