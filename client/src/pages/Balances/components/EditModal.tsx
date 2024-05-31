import { useMutation } from "@tanstack/react-query";
import { BalancesCategory } from "../../../models/balances";
import { deleteBalance, updateBalance } from "../../../api/services";
import { queryClient } from "../../../api/queries/queryClient";
import { handleAmountChange } from "../../../utils/transaction";
import { BALANCE_TYPES } from "../../../config/constants";
import { useAuth } from "../../../hooks/useAuth";

interface EditModalProps {
  id: string;
  account: string;
  setAccount: React.Dispatch<React.SetStateAction<string>>;
  amount: string;
  setAmount: React.Dispatch<React.SetStateAction<string>>;
  type: string;
  setType: React.Dispatch<React.SetStateAction<string>>;
  handleClose: () => void;
}

const EditModal = ({
  id,
  account,
  setAccount,
  amount,
  setAmount,
  type,
  setType,
  handleClose,
}: EditModalProps) => {
  const { user } = useAuth();
  const userId = user?.uid || "";
  const userName = user?.email || "";

  const updateMutation = useMutation({
    mutationFn: (updatedBalance: BalancesCategory) => {
      if (!userId) {
        throw new Error("User ID undefined");
      }

      return updateBalance(user!, updatedBalance);
    },
  });

  const handleSubmit = () => {
    if (!userId || !id) {
      return;
    }

    updateMutation.mutate(
      {
        id,
        user: userName,
        account,
        amount,
        type,
        userId,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["balances", userId],
          });
          handleClose();
        },
      }
    );
  };

  const deleteMutation = useMutation({
    mutationFn: (balanceId: string) => {
      if (!userId) {
        throw new Error("User ID undefined");
      }

      return deleteBalance(user!, balanceId);
    },
  });

  const handleDelete = () => {
    if (!userId || !id) {
      return;
    }

    deleteMutation.mutate(id, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["balances", userId],
        });
        handleClose();
      },
    });
  };

  return (
    <dialog id="edit_balance_modal" className="modal">
      <div className="modal-box w-full max-w-xl">
        <form method="dialog">
          <button className="btn btn-ghost absolute right-2 top-2">x</button>
        </form>
        <h3 className="font-bold text-lg">Edit Balance</h3>
        <div className="h-64 p-4 space-y-4">
          <label className="input input-bordered flex items-center gap-2">
            <input
              aria-label="Account"
              type="text"
              className="grow"
              placeholder="Account"
              value={account}
              onChange={(e) => setAccount(e.target.value)}
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            <input
              aria-label="Balance Amount"
              type="number"
              className="grow"
              placeholder="Amount ($)"
              value={amount}
              onChange={(e) => handleAmountChange(e, setAmount)}
            />
          </label>
          <select
            aria-label="Balance Type"
            className="select input-bordered w-full"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option disabled>Type</option>
            {BALANCE_TYPES.map((item) => {
              return <option key={item}>{item}</option>;
            })}
          </select>
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
