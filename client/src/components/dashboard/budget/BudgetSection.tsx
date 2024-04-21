import { BudgetCategory } from "../../../models/BudgetCategory";
import AddBudgetModal from "./AddBudgetModal";
import BudgetTable from "./BudgetTable";

interface BudgetSectionProps {
  budget: BudgetCategory[];
}

const BudgetSection = ({ budget }: BudgetSectionProps) => {
  return (
    <div className="my-4 p-4 rounded-md flex flex-col space-y-4 outline outline-1 outline-gray-200">
      <div className="flex flex-row justify-between items-center">
        <h1 className="font-bold text-xl text-center">Budget</h1>
        <AddBudgetModal />
      </div>
      <BudgetTable data={budget} />
    </div>
  );
};

export default BudgetSection;
