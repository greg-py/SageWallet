import { useAuth0 } from "@auth0/auth0-react";
import { handleAmountChange } from "../../../utils/transaction";
import { useMutation } from "@tanstack/react-query";
import { Income } from "../../../models/income";
import { queryClient } from "../../../api/queries/queryClient";
import { deleteIncome, updateIncome } from "../../../api/services";

interface EditModalProps {
  id: string;
  date: string;
  setDate: React.Dispatch<React.SetStateAction<string>>;
  source: string;
  setSource: React.Dispatch<React.SetStateAction<string>>;
  amount: string;
  setAmount: React.Dispatch<React.SetStateAction<string>>;
  handleClose: () => void;
  minDate: string;
  maxDate: string;
  filterMonth: number;
  filterYear: number;
}

const EditModal = ({
  id,
  date,
  setDate,
  source,
  setSource,
  amount,
  setAmount,
  handleClose,
  minDate,
  maxDate,
  filterMonth,
  filterYear,
}: EditModalProps) => {
  // User authentication
  const { user } = useAuth0();
  const userId = user?.sub || "";
  const userName = user?.email || "";

  const updateMutation = useMutation({
    mutationFn: (updatedIncome: Income) => {
      if (!userId) {
        throw new Error("User ID undefined");
      }

      return updateIncome(userId, updatedIncome);
    },
  });

  const handleSubmit = () => {
    if (!userId || !id) {
      return;
    }

    updateMutation.mutate(
      {
        id,
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
          handleClose();
        },
      }
    );
  };

  const deleteMutation = useMutation({
    mutationFn: (incomeId: string) => {
      if (!userId) {
        throw new Error("User ID undefined");
      }

      return deleteIncome(userId, incomeId);
    },
  });

  const handleDelete = () => {
    if (!userId || !id) {
      return;
    }

    deleteMutation.mutate(id, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["income", userId, filterMonth, filterYear],
        });
        handleClose();
      },
    });
  };

  return (
    <dialog id="edit_income_modal" className="modal">
      <div className="modal-box w-full max-w-xl">
        <form method="dialog">
          <button className="btn btn-ghost absolute right-2 top-2">x</button>
        </form>
        <h3 className="font-bold text-lg">Edit Income</h3>
        <div className="h-64 p-4 space-y-4">
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
