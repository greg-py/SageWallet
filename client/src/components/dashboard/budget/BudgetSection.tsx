import { BudgetCategory } from "../../../models/BudgetCategory";
import { Transaction } from "../../../models/Transaction";
import { calculateBudgetCurrents } from "../../../utils/transactionUtils";
import AddBudgetModal from "./AddBudgetModal";
import BudgetTable from "./BudgetTable";

interface BudgetSectionProps {
  budget: BudgetCategory[];
  transactions: Transaction[];
}

const BudgetSection = ({ budget, transactions }: BudgetSectionProps) => {
  const calculatedBudget = calculateBudgetCurrents(budget, transactions);

  return (
    <div className="p-4 max-h-screen overflow-y-scroll overflow-x-scroll rounded-md flex flex-col space-y-4">
      <div className="flex flex-row justify-between items-center">
        <h1 className="font-bold text-xl text-center">Budget</h1>
        <AddBudgetModal />
      </div>
      <BudgetTable data={calculatedBudget} />
    </div>
  );
};

export default BudgetSection;
