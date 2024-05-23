import { useAuth0 } from "@auth0/auth0-react";
import PageContainer from "../../components/Layout/PageContainer";
import PageTitle from "../../components/Layout/PageTitle";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../../components/Layout/Spinner";
import PageCard from "../../components/Layout/PageCard";
import BalancesTable from "./components/BalancesTable";
import { balancesQuery } from "../../api/queries";
import AddModal from "./components/AddModal";
import Error from "../../components/Layout/Error";

const Balances = () => {
  // User authentication
  const { user, getAccessTokenSilently } = useAuth0();
  const userId = user?.sub || "";

  // Queries
  const {
    isPending: isBalancesPending,
    error: balancesError,
    data: balances,
  } = useQuery(balancesQuery(userId, getAccessTokenSilently));

  // Show loading spinner if queries are pending
  if (isBalancesPending) {
    return <Spinner />;
  }

  // Show error message if queries have error
  if (balancesError) {
    return <Error />;
  }

  return (
    <PageContainer>
      <div className="flex flex-row justify-between">
        <PageTitle>Balances</PageTitle>
        <AddModal />
      </div>
      <PageCard>
        <BalancesTable balances={balances} />
      </PageCard>
    </PageContainer>
  );
};

export default Balances;
