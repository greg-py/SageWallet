import { BudgetCategory } from "../../../models/budget";
import { Transaction } from "../../../models/transaction";

interface BudgetTableProps {
  budget: BudgetCategory[];
  transactions: Transaction[];
}

const BudgetTable = ({ budget, transactions }: BudgetTableProps) => {
  return (
    <div>
      <div className="flex flex-row justify-between">
        <h2 className="font-bold text-xl">Categories</h2>
        <button className="btn">Add</button>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Budget</th>
              <th>Current</th>
              <th>Difference</th>
              <th>Current (%)</th>
            </tr>
          </thead>
          <tbody>
            <tr></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BudgetTable;
