import PageContainer from "../../components/Layout/PageContainer";
import PageTitle from "../../components/Layout/PageTitle";
import Spinner from "../../components/Layout/Spinner";
import PageCard from "../../components/Layout/PageCard";
import BalancesTable from "./components/BalancesTable";
import AddModal from "./components/AddModal";
import Error from "../../components/Layout/Error";
import { useBalancesData } from "../../hooks/useBalancesData";
import Layout from "../../components/Layout/Layout";

const Balances = () => {
  const { isPending, error, data } = useBalancesData();

  // Show loading spinner if queries are pending
  if (isPending) {
    return <Spinner />;
  }

  // Show error message if queries have error
  if (error || !data) {
    return <Error />;
  }

  return (
    <Layout>
      <PageContainer>
        <div className="flex flex-row justify-between">
          <PageTitle>Balances</PageTitle>
          <AddModal />
        </div>
        <PageCard>
          <BalancesTable balances={data} />
        </PageCard>
      </PageContainer>
    </Layout>
  );
};

export default Balances;
