import { useAuth0 } from "@auth0/auth0-react";
import { BudgetCategory } from "../../../../models/budget";
import { useMutation } from "@tanstack/react-query";
import { deleteBudget, updateBudget } from "../../../../api/services";
import { queryClient } from "../../../../api/queries/queryClient";
import { handleBudgetAmountChange } from "../../../../utils/dashboard";

interface EditModalProps {
  budget: BudgetCategory | null;
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  amount: string;
  setAmount: React.Dispatch<React.SetStateAction<string>>;
  handleClose: () => void;
}

const EditModal = ({
  budget,
  category,
  setCategory,
  amount,
  setAmount,
  handleClose,
}: EditModalProps) => {
  const { user } = useAuth0();

  const updateMutation = useMutation({
    mutationFn: (updatedBudget: BudgetCategory) => {
      if (!user?.sub) {
        throw new Error("User ID undefined");
      }

      return updateBudget(user.sub, updatedBudget);
    },
  });

  const handleSubmit = () => {
    if (!user?.sub || !budget?.id) {
      return;
    }

    updateMutation.mutate(
      { id: budget.id, category, budget: amount, userId: user.sub },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["budget"] });
          handleClose();
        },
      }
    );
  };

  const deleteMutation = useMutation({
    mutationFn: (budgetId: string) => {
      if (!user?.sub) {
        throw new Error("User ID undefined");
      }

      return deleteBudget(user.sub, budgetId);
    },
  });

  const handleDelete = () => {
    if (!user?.sub || !budget?.id) {
      return;
    }

    deleteMutation.mutate(budget.id, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["budget"] });
        handleClose();
      },
    });
  };

  return (
    <dialog id="edit_budget_modal" className="modal">
      <div className="modal-box w-full max-w-xl">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            x
          </button>
        </form>
        <h3 className="font-bold text-lg">Edit Transaction</h3>
        <div className="h-64 p-4 space-y-4">
          <label className="input input-bordered flex items-center gap-2">
            <input
              aria-label="Budget Category"
              type="text"
              className="grow"
              placeholder="Vendor"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            <input
              aria-label="Budget Amount"
              type="number"
              className="grow"
              placeholder="Budget ($)"
              value={amount}
              onChange={(e) => handleBudgetAmountChange(e, setAmount)}
            />
          </label>
        </div>
        <div className="modal-action">
          <button className="btn btn-error" onClick={handleDelete}>
            Delete
          </button>
          <button className="btn" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default EditModal;
