import { useState } from "react";
import Spinner from "../../../../components/Layout/Spinner";
import { BudgetCategory } from "../../../../models/budget";
import { Transaction } from "../../../../models/transaction";
import { calculateBudgetCurrents } from "../../../../utils/dashboard";
import AddModal from "./AddModal";
import EditModal from "./EditModal";
import DashboardCard from "../DashboardCard";
import CurrencyText from "../../../../components/UI/CurrencyText";

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

  // Calculate current budget category totals based on transactions data
  const calculatedData = calculateBudgetCurrents(
    budgetCategories,
    transactions
  );

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
    <DashboardCard>
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
                      <tr
                        key={category.id}
                        className="hover:cursor-pointer hover:bg-base-200"
                        onClick={() => handleEditModalOpen(category)}
                      >
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
    </DashboardCard>
  );
};

export default BudgetTable;
