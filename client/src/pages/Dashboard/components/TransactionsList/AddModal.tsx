import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "@tanstack/react-query";
import { Transaction } from "../../../../models/transaction";
import { addTransaction } from "../../../../api/services/defs/transaction";
import { queryClient } from "../../../../api/queries/queryClient";
import { handleTransactionAmountChange } from "../../../../utils/dashboard";

const AddModal = () => {
  const [date, setDate] = useState("");
  const [vendor, setVendor] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  const { user } = useAuth0();

  const clearState = () => {
    setDate("");
    setVendor("");
    setAmount("");
    setCategory("");
  };

  // Function to open add transaction modal
  const handleAddModalOpen = () => {
    clearState();
    (
      document.getElementById("add_transaction_modal") as HTMLDialogElement
    )?.showModal();
  };

  const mutation = useMutation({
    mutationFn: (newTransaction: Transaction) => {
      if (!user?.sub) {
        throw new Error("User ID undefined");
      }

      return addTransaction(user.sub, newTransaction);
    },
  });

  const handleSubmit = () => {
    if (!user?.sub) {
      return;
    }

    mutation.mutate(
      {
        date,
        vendor,
        price: amount,
        category,
        userId: user.sub,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["transactions"] });
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
      <dialog id="add_transaction_modal" className="modal">
        <div className="modal-box w-full max-w-xl">
          <form method="dialog">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={clearState}
            >
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Add Transaction</h3>
          <div className="h-64 p-4 space-y-4">
            <label className="input input-bordered flex items-center gap-2">
              <input
                aria-label="Date of Transaction"
                type="date"
                className="grow"
                placeholder="Date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </label>
            <label className="input input-bordered flex items-center gap-2">
              <input
                aria-label="Transaction Vendor"
                type="text"
                className="grow"
                placeholder="Vendor"
                value={vendor}
                onChange={(e) => setVendor(e.target.value)}
              />
            </label>
            <label className="input input-bordered flex items-center gap-2">
              <input
                aria-label="Transaction Amount"
                type="number"
                className="grow"
                placeholder="Amount ($)"
                value={amount}
                onChange={(e) => handleTransactionAmountChange(e, setAmount)}
              />
            </label>
            <label className="input input-bordered flex items-center gap-2">
              <input
                aria-label="Transaction Category"
                type="text"
                className="grow"
                placeholder="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
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
