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
    <div className="p-4 rounded-md flex flex-col space-y-4">
      <div className="flex flex-row justify-between items-center">
        <h1 className="font-bold text-xl text-center">Budget</h1>
        <AddBudgetModal />
      </div>
      <div className="max-h-96 overflow-y-scroll hide-scrollbar">
        <BudgetTable data={calculatedBudget} />
      </div>
    </div>
  );
};

export default BudgetSection;
