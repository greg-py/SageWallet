import { useAuth0 } from "@auth0/auth0-react";
import { BudgetCategory } from "../../../models/budget";
import { useMutation } from "@tanstack/react-query";
import { deleteBudget, updateBudget } from "../../../api/services";
import { queryClient } from "../../../api/queries/queryClient";
import { handleBudgetAmountChange } from "../../../utils/dashboard";

interface EditModalProps {
  id: string;
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  amount: string;
  setAmount: React.Dispatch<React.SetStateAction<string>>;
  handleClose: () => void;
}

const EditModal = ({
  id,
  category,
  setCategory,
  amount,
  setAmount,
  handleClose,
}: EditModalProps) => {
  const { user } = useAuth0();
  const userId = user?.sub || "";

  const updateMutation = useMutation({
    mutationFn: (updatedBudget: BudgetCategory) => {
      if (!userId) {
        throw new Error("User ID undefined");
      }

      return updateBudget(userId, updatedBudget);
    },
  });

  const handleSubmit = () => {
    if (!userId || !id) {
      return;
    }

    updateMutation.mutate(
      { id: id, category, budget: amount, userId: userId },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["budget", userId] });
          handleClose();
        },
      }
    );
  };

  const deleteMutation = useMutation({
    mutationFn: (budgetId: string) => {
      if (!userId) {
        throw new Error("User ID undefined");
      }

      return deleteBudget(userId, budgetId);
    },
  });

  const handleDelete = () => {
    if (!userId || !id) {
      return;
    }

    deleteMutation.mutate(id, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["budget", userId] });
        handleClose();
      },
    });
  };

  return (
    <dialog id="edit_budget_modal" className="modal">
      <div className="modal-box w-full max-w-xl">
        <form method="dialog">
          <button className="btn btn-ghost absolute right-2 top-2">x</button>
        </form>
        <h3 className="font-bold text-lg">Edit Budget</h3>
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
