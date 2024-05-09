import { BudgetCategory } from "../../../../models/budget";
import { Transaction } from "../../../../models/transaction";
import { calculateBudgetCurrents } from "../../../../utils/dashboard";
import DashboardCard from "../DashboardCard";
import CurrencyText from "../../../../components/UI/CurrencyText";

interface BudgetTableProps {
  budgetCategories: BudgetCategory[];
  transactions: Transaction[];
}

const BudgetTable = ({ budgetCategories, transactions }: BudgetTableProps) => {
  // Calculate current budget category totals based on transactions data
  const calculatedData = calculateBudgetCurrents(
    budgetCategories,
    transactions
  );

  return (
    <DashboardCard>
      <h2 className="font-bold text-xl">Top Budget Categories</h2>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Budget ($)</th>
              <th>Current ($)</th>
              <th>Difference ($)</th>
              <th>Current (%)</th>
            </tr>
          </thead>
          <tbody>
            {calculatedData &&
              calculatedData.map((category) => {
                const isOverBudget =
                  category.current &&
                  parseInt(category.current) > parseInt(category.budget);
                const isEqualsBudget =
                  category.current &&
                  parseInt(category.current) === parseInt(category.budget);
                const categoryColor = isOverBudget
                  ? "text-error"
                  : isEqualsBudget
                  ? "text-warning"
                  : "text-success";
                const categoryDifference =
                  category.current &&
                  (
                    parseInt(category.current) - parseInt(category.budget)
                  ).toString();
                return (
                  <tr key={category.id}>
                    <th>{category.category}</th>
                    <th>
                      {typeof category.budget === "string" ? (
                        <CurrencyText value={category.budget} />
                      ) : (
                        "$0"
                      )}
                    </th>
                    <th className={categoryColor}>
                      {typeof category.current === "string" ? (
                        <CurrencyText value={category.current} />
                      ) : (
                        "$0"
                      )}
                    </th>
                    <th className={categoryColor}>
                      {categoryDifference !== undefined ? (
                        <CurrencyText value={categoryDifference} />
                      ) : null}
                    </th>
                    <th className={categoryColor}>
                      {typeof category.currentPercentage === "string"
                        ? `${category.currentPercentage}%`
                        : null}
                    </th>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </DashboardCard>
  );
};

export default BudgetTable;
