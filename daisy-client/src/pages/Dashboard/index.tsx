import StatsGrid from "./components/StatsGrid";
import BudgetGrid from "./components/BudgetGrid";
import { useAuth0 } from "@auth0/auth0-react";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../components/Layout/LoadingSpinner";
import { budgetQuery } from "../../api/queries";

const Dashboard = () => {
  const { user } = useAuth0();
  const userId = user?.sub || "";
  const { isPending, error, data } = useQuery(budgetQuery(userId));

  console.log(data);

  if (isPending) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
      <StatsGrid />
      <BudgetGrid />
    </div>
  );
};

export default Dashboard;
