// import { Transaction } from "../models/Transaction";
import { useAuth0 } from "@auth0/auth0-react";
import TransactionsTable from "../components/dashboard/transactions/TransactionsTable";
import { useQuery } from "@tanstack/react-query";
import { getTransactions } from "../api/transactions";
import LoadingOverlay from "../components/layout/LoadingOverlay";

const Dashboard = () => {
  const { user } = useAuth0();
  const { isPending, error, data } = useQuery({
    queryKey: ["transactions"],
    queryFn: () => getTransactions(user?.sub),
  });

  if (isPending) {
    return <LoadingOverlay />;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return <TransactionsTable data={data} />;
};

export default Dashboard;
