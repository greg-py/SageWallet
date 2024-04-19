import { useAuth0 } from "@auth0/auth0-react";
import TransactionsTable from "../components/dashboard/transactions/TransactionsTable";
import { useQuery } from "@tanstack/react-query";
import LoadingOverlay from "../components/layout/LoadingOverlay";
import { transactionsQuery } from "../api/queries/transactions";
import AddTransactionModal from "../components/dashboard/transactions/AddTransactionModal";

const Dashboard = () => {
  const { user } = useAuth0();
  const userId = user?.sub || "";
  const { isPending, error, data } = useQuery(transactionsQuery(userId));

  if (isPending) {
    return <LoadingOverlay />;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div className="my-4 flex flex-col space-y-4">
      <h1 className="font-bold text-xl text-center">Transactions</h1>
      <TransactionsTable data={data} />
      <div className="max-w-24">
        <AddTransactionModal />
      </div>
    </div>
  );
};

export default Dashboard;
