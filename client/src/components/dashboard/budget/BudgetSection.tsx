import { Budget, BudgetColumns } from "../../../models/Budget";
import DataTable from "../../layout/DataTable";

interface BudgetSectionProps {
  data: Budget[];
  setData: React.Dispatch<React.SetStateAction<Budget[]>>;
}

const BudgetSection = ({ data }: BudgetSectionProps) => {
  return (
    <div className="flex flex-col w-full items-center p-4">
      <h5 className="text-xl font-bold pb-4">Budget</h5>
      <div className="w-full overflow-x-scroll outline outline-1 rounded-md">
        <DataTable columns={BudgetColumns} data={data} size="small" />
      </div>
    </div>
  );
};

export default BudgetSection;
