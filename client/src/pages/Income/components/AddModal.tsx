import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import { handleAmountChange } from "../../../utils/transaction";
import { useMutation } from "@tanstack/react-query";
import { Income } from "../../../models/income";
import { queryClient } from "../../../api/queries/queryClient";
import { addIncome } from "../../../api/services";

interface AddModalProps {
  minDate: string;
  maxDate: string;
  filterMonth: number;
  filterYear: number;
}

const AddModal = ({
  minDate,
  maxDate,
  filterMonth,
  filterYear,
}: AddModalProps) => {
  // Component state
  const [date, setDate] = useState("");
  const [source, setSource] = useState("");
  const [amount, setAmount] = useState("");

  // User authentication
  const { user, getAccessTokenSilently } = useAuth0();
  const userId = user?.sub || "";
  const userName = user?.email || "";

  // Function to clear component state after submission
  const clearState = () => {
    setDate("");
    setSource("");
    setAmount("");
  };

  // Function to open add income modal
  const handleAddModalOpen = () => {
    clearState();
    (
      document.getElementById("add_income_modal") as HTMLDialogElement
    )?.showModal();
  };

  const mutation = useMutation({
    mutationFn: (newIncome: Income) => {
      if (!userId) {
        throw new Error("User ID undefined");
      }

      return addIncome(userId, newIncome, getAccessTokenSilently);
    },
  });

  const handleSubmit = () => {
    if (!userId || !userName) {
      return;
    }

    mutation.mutate(
      {
        date,
        user: userName,
        source,
        amount,
        userId,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["income", userId, filterMonth, filterYear],
          });
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
      <dialog id="add_income_modal" className="modal">
        <div className="modal-box w-full max-w-xl">
          <form method="dialog">
            <button className="btn btn-ghost absolute right-2 top-2">x</button>
          </form>
          <h3 className="font-bold text-lg">Add Income</h3>
          <div className="h-full p-4 space-y-4">
            <label className="input input-bordered flex items-center gap-2">
              <input
                aria-label="Date of Income"
                type="date"
                className="grow"
                placeholder="Date"
                value={date}
                min={minDate}
                max={maxDate}
                onChange={(e) => setDate(e.target.value)}
              />
            </label>
            <label className="input input-bordered flex items-center gap-2">
              <input
                aria-label="Income Source"
                type="text"
                className="grow"
                placeholder="Source"
                value={source}
                onChange={(e) => setSource(e.target.value)}
              />
            </label>
            <label className="input input-bordered flex items-center gap-2">
              <input
                aria-label="Income Amount"
                type="number"
                className="grow"
                placeholder="Amount ($)"
                value={amount}
                onChange={(e) => handleAmountChange(e, setAmount)}
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
