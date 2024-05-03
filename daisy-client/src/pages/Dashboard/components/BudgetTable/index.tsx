import { BudgetCategory } from "../../../../models/budget";
import { Transaction } from "../../../../models/transaction";
import { calculateBudgetCurrents } from "../../../../utils/dashboard";

interface BudgetTableProps {
  budgetCategories: BudgetCategory[];
  transactions: Transaction[];
  refetchPending: boolean;
}

const BudgetTable = ({
  budgetCategories,
  transactions,
  refetchPending,
}: BudgetTableProps) => {
  // Calculate current budget category totals based on transactions data
  const calculatedData = calculateBudgetCurrents(
    budgetCategories,
    transactions
  );

  return (
    <div className="col-span-12 rounded-box scrollable-rounded max-h-full bg-base-100 overflow-y-scroll p-8 shadow-xl xl:col-span-6">
      <div className="flex flex-row justify-between">
        <h2 className="font-bold text-xl">Budget</h2>
        <button className="btn btn-sm btn-neutral">Add</button>
      </div>
      {refetchPending ? (
        <div>Loading</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Category</th>
                <th>Budget</th>
                <th>Current</th>
              </tr>
            </thead>
            <tbody>
              {calculatedData &&
                calculatedData.map((category) => {
                  const isOverBudget =
                    category.current &&
                    parseInt(category.current) > parseInt(category.budget);
                  return (
                    <tr key={category.id}>
                      <th>{category.category}</th>
                      <th>
                        {typeof category.budget === "string"
                          ? `$${category.budget}`
                          : "$0"}
                      </th>
                      <th
                        className={
                          isOverBudget
                            ? "bg-error rounded-box"
                            : "bg-primary rounded-box"
                        }
                      >
                        {typeof category.current === "string"
                          ? `$${category.current}`
                          : "$0"}
                      </th>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BudgetTable;
