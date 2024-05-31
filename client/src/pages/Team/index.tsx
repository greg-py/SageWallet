import Layout from "../../components/Layout/Layout";
import PageContainer from "../../components/Layout/PageContainer";
import PageTitle from "../../components/Layout/PageTitle";
import CreateTeam from "./CreateTeam";

const Team = () => {
  const hasTeam = false;

  return (
    <Layout>
      <PageContainer>
        <PageTitle>Team</PageTitle>
        {!hasTeam && <CreateTeam />}
      </PageContainer>
    </Layout>
  );
};

export default Team;
