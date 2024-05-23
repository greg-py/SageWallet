import { useState } from "react";
import CurrencyText from "../../../components/UI/CurrencyText";
import { BudgetCategory } from "../../../models/budget";
import { Transaction } from "../../../models/transaction";
import {
  calculateBudgetCurrents,
  calculateBudgetTotals,
} from "../../../utils/budget";
import EditModal from "./EditModal";
import CategoryModal from "./CategoryModal";

interface BudgetTableProps {
  budget: BudgetCategory[];
  transactions: Transaction[];
  editEnabled: boolean;
}

const BudgetTable = ({
  budget,
  transactions,
  editEnabled,
}: BudgetTableProps) => {
  // Component state
  const [id, setId] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  const initializeBudgetEdit = (budget: BudgetCategory) => {
    if (!budget?.id) {
      return;
    }

    setId(budget.id);
    setCategory(budget.category);
    setAmount(budget.budget);
  };

  // Calculate current budget category totals based on transactions data
  const calculatedData = calculateBudgetCurrents(budget, transactions);

  // Calculate totals of budget values for table footer row
  const budgetTotals = calculateBudgetTotals(budget);

  const handleEditModalOpen = (budget: BudgetCategory) => {
    initializeBudgetEdit(budget);
    (
      document.getElementById("edit_budget_modal") as HTMLDialogElement
    )?.showModal();
  };

  const handleEditModalClose = () => {
    (
      document.getElementById("edit_budget_modal") as HTMLDialogElement
    )?.close();
  };

  const handleCategoryModalOpen = (category: string) => {
    setFilterCategory(category);
    (
      document.getElementById("filter_category_modal") as HTMLDialogElement
    )?.showModal();
  };

  return (
    <>
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
                  <tr
                    key={category.id}
                    className="hover:cursor-pointer hover:bg-base-200"
                    onClick={() => {
                      if (editEnabled) {
                        handleEditModalOpen(category);
                      } else {
                        handleCategoryModalOpen(category.category);
                      }
                    }}
                  >
                    <th>{category.category}</th>
                    <th>{<CurrencyText value={category.budget} />}</th>
                    <th className={categoryColor}>
                      {category.current && (
                        <CurrencyText value={category.current} />
                      )}
                    </th>
                    <th className={categoryColor}>
                      {categoryDifference && (
                        <CurrencyText value={categoryDifference} />
                      )}
                    </th>
                    <th className={categoryColor}>
                      {category.currentPercentage &&
                        `${category.currentPercentage}%`}
                    </th>
                  </tr>
                );
              })}
          </tbody>
          <tfoot className="border-t border-accent">
            <tr>
              <th>Totals</th>
              <th>
                <CurrencyText
                  value={budgetTotals.budgetTotal?.toString()}
                  decimalScale={0}
                />
              </th>
              <th>
                <CurrencyText
                  value={budgetTotals.currentTotal?.toString()}
                  decimalScale={0}
                />
              </th>
              <th>
                <CurrencyText
                  value={budgetTotals.differenceTotal?.toString()}
                  decimalScale={0}
                />
              </th>
              <th></th>
            </tr>
          </tfoot>
        </table>
      </div>
      <EditModal
        id={id}
        amount={amount}
        setAmount={setAmount}
        category={category}
        setCategory={setCategory}
        handleClose={handleEditModalClose}
      />
      <CategoryModal transactions={transactions} category={filterCategory} />
    </>
  );
};

export default BudgetTable;
