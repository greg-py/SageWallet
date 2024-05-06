import { useState } from "react";
import Spinner from "../../../../components/Layout/Spinner";
import { BudgetCategory } from "../../../../models/budget";
import { Transaction } from "../../../../models/transaction";
import {
  calculateBudgetCurrents,
  calculateBudgetTotals,
} from "../../../../utils/dashboard";
import AddModal from "./AddModal";
import EditModal from "./EditModal";

interface BudgetTableProps {
  budgetCategories: BudgetCategory[];
  transactions: Transaction[];
  filterCategories: string[];
  refetchPending: boolean;
}

const BudgetTable = ({
  budgetCategories,
  transactions,
  filterCategories,
  refetchPending,
}: BudgetTableProps) => {
  // State for edit modal
  const [budget, setBudget] = useState<BudgetCategory | null>(null);
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");

  // Function for setting budget edit state
  const initializeBudgetEdit = (budget: BudgetCategory) => {
    {
      setBudget(budget);
      setCategory(budget.category);
      setAmount(budget.budget);
    }
  };

  // Filter the categories if a filter category is chosen
  const filteredCategories = filterCategories.length
    ? budgetCategories.filter((category) =>
        filterCategories.includes(category.category)
      )
    : budgetCategories;

  // Calculate current budget category totals based on transactions data
  const calculatedData = calculateBudgetCurrents(
    filteredCategories,
    transactions
  );

  const budgetTotals = calculateBudgetTotals(calculatedData);

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

  return (
    <div className="col-span-12 h-96 rounded-box scrollable-rounded max-h-full bg-base-100 overflow-y-scroll p-8 shadow-xl xl:col-span-6">
      {refetchPending ? (
        <Spinner />
      ) : (
        <>
          <div className="flex flex-row justify-between">
            <h2 className="font-bold text-xl">Budget</h2>
            <AddModal />
          </div>
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Budget ($)</th>
                  <th>Current ($)</th>
                  <th>Current (%)</th>
                </tr>
              </thead>
              <tbody>
                {calculatedData &&
                  calculatedData.map((category) => {
                    const isOverBudget =
                      category.current &&
                      parseInt(category.current) > parseInt(category.budget);
                    return (
                      <tr
                        key={category.id}
                        className="hover:cursor-pointer hover:bg-base-200"
                        onClick={() => handleEditModalOpen(category)}
                      >
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
                        <th></th>
                      </tr>
                    );
                  })}
              </tbody>
              <tfoot>
                <tr>
                  <th>Total</th>
                  <th>
                    {budgetTotals.budgetTotal
                      ? `$${budgetTotals.budgetTotal}`
                      : null}
                  </th>
                  <th>
                    {budgetTotals.currentTotal
                      ? `$${budgetTotals.currentTotal}`
                      : null}
                  </th>
                </tr>
              </tfoot>
            </table>
          </div>
          <EditModal
            budget={budget}
            amount={amount}
            setAmount={setAmount}
            category={category}
            setCategory={setCategory}
            handleClose={handleEditModalClose}
          />
        </>
      )}
    </div>
  );
};

export default BudgetTable;
