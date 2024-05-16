import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { BudgetCategory } from "../../../models/budget";
import { addBudget } from "../../../api/services";
import { queryClient } from "../../../api/queries/queryClient";
import { handleAmountChange } from "../../../utils/transaction";

const AddModal = () => {
  // Component state
  const [category, setCategory] = useState("");
  const [budget, setBudget] = useState("");

  // User authentication
  const { user } = useAuth0();
  const userId = user?.sub || "";

  // Function to clear component state after submission
  const clearState = () => {
    setCategory("");
    setBudget("");
  };

  // Function to open add transaction modal
  const handleAddModalOpen = () => {
    clearState();
    (
      document.getElementById("add_budget_modal") as HTMLDialogElement
    )?.showModal();
  };

  const mutation = useMutation({
    mutationFn: (newBudget: BudgetCategory) => {
      if (!userId) {
        throw new Error("User ID undefined");
      }

      return addBudget(userId, newBudget);
    },
  });

  const handleSubmit = () => {
    if (!userId) {
      return;
    }

    mutation.mutate(
      {
        category,
        budget,
        userId,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["budget", userId] });
          clearState();
        },
      }
    );
  };

  return (
    <>
      <button className="btn btn-primary btn-sm" onClick={handleAddModalOpen}>
        Add
      </button>
      <dialog id="add_budget_modal" className="modal">
        <div className="modal-box w-full max-w-xl">
          <form method="dialog">
            <button className="btn btn-ghost absolute right-2 top-2">x</button>
          </form>
          <h3 className="font-bold text-lg">Add Budget</h3>
          <div className="h-full p-4 space-y-4">
            <label className="input input-bordered flex items-center gap-2">
              <input
                aria-label="Budget Category"
                type="text"
                className="grow"
                placeholder="Category"
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
                value={budget}
                onChange={(e) => handleAmountChange(e, setBudget)}
              />
            </label>
          </div>
          <div className="modal-action">
            <button className="btn" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default AddModal;
