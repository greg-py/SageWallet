import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import { handleBudgetAmountChange } from "../../../../utils/dashboard";
import { useMutation } from "@tanstack/react-query";
import { BudgetCategory } from "../../../../models/budget";
import { addBudget } from "../../../../api/services";
import { queryClient } from "../../../../api/queries/queryClient";
import { HexColorPicker } from "react-colorful";

const AddModal = () => {
  // Component state
  const [category, setCategory] = useState("");
  const [budget, setBudget] = useState("");
  const [color, setColor] = useState("");

  // User authentication
  const { user } = useAuth0();

  // Function to clear component state after submission
  const clearState = () => {
    setCategory("");
    setBudget("");
    setColor("");
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
      if (!user?.sub) {
        throw new Error("User ID undefined");
      }

      return addBudget(user.sub, newBudget);
    },
  });

  const handleSubmit = () => {
    if (!user?.sub) {
      return;
    }

    mutation.mutate(
      {
        category,
        budget,
        color,
        userId: user.sub,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["dashboard"] });
          clearState();
        },
      }
    );
  };

  return (
    <>
      <button className="btn btn-neutral btn-sm" onClick={handleAddModalOpen}>
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
                onChange={(e) => handleBudgetAmountChange(e, setBudget)}
              />
            </label>
            <div className="space-y-4">
              <label className="input input-bordered flex items-center gap-2">
                <input
                  aria-label="Category Color"
                  type="text"
                  className="grow"
                  placeholder="Category Color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                />
              </label>
              <HexColorPicker color={color} onChange={setColor} />
            </div>
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
