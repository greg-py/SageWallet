import PageContainer from "../../components/Layout/PageContainer";
import PageTitle from "../../components/Layout/PageTitle";
import CreateTeam from "./CreateTeam";

const Team = () => {
  const hasTeam = false;

  return (
    <PageContainer>
      <PageTitle>Team</PageTitle>
      {!hasTeam && <CreateTeam />}
    </PageContainer>
  );
};

export default Team;
