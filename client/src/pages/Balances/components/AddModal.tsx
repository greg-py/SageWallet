import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { BalancesCategory } from "../../../models/balances";
import { addBalance } from "../../../api/services";
import { queryClient } from "../../../api/queries/queryClient";
import { handleAmountChange } from "../../../utils/transaction";
import { BALANCE_TYPES } from "../../../config/constants";
import { useAuth } from "../../../hooks/useAuth";

const AddModal = () => {
  // Component state
  const [account, setAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState(BALANCE_TYPES[0]);

  // User authentication
  const { user } = useAuth();
  const userId = user?.uid || "";
  const userName = user?.email || "";

  // Function to clear component state after submission
  const clearState = () => {
    setAccount("");
    setAmount("");
    setType(BALANCE_TYPES[0]);
  };

  // Function to open add balance modal
  const handleAddModalOpen = () => {
    clearState();
    (
      document.getElementById("add_balance_modal") as HTMLDialogElement
    )?.showModal();
  };

  const mutation = useMutation({
    mutationFn: (newBalance: BalancesCategory) => {
      if (!userId) {
        throw new Error("User ID undefined");
      }

      return addBalance(user!, newBalance);
    },
  });

  const handleSubmit = () => {
    if (!userId || !userName) {
      return;
    }

    mutation.mutate(
      {
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
      <dialog id="add_balance_modal" className="modal">
        <div className="modal-box w-full max-w-xl">
          <form method="dialog">
            <button className="btn btn-ghost absolute right-2 top-2">x</button>
          </form>
          <h3 className="font-bold text-lg">Add Balance</h3>
          <div className="h-full p-4 space-y-4">
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
