import { useAuth0 } from "@auth0/auth0-react";
import {
  buildCategoryList,
  handleTransactionAmountChange,
} from "../../../../utils/dashboard";
import { useMutation } from "@tanstack/react-query";
import { Transaction } from "../../../../models/transaction";
import {
  deleteTransaction,
  updateTransaction,
} from "../../../../api/services/defs/transaction";
import { queryClient } from "../../../../api/queries/queryClient";
import { BudgetCategory } from "../../../../models/budget";

interface EditModalProps {
  transaction: Transaction | null;
  date: string;
  setDate: React.Dispatch<React.SetStateAction<string>>;
  vendor: string;
  setVendor: React.Dispatch<React.SetStateAction<string>>;
  amount: string;
  setAmount: React.Dispatch<React.SetStateAction<string>>;
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  handleClose: () => void;
  budgetCategories: BudgetCategory[];
}

const EditModal = ({
  transaction,
  date,
  setDate,
  vendor,
  setVendor,
  amount,
  setAmount,
  category,
  setCategory,
  handleClose,
  budgetCategories,
}: EditModalProps) => {
  const { user } = useAuth0();

  // Build list of categories for add transaction modal from budget categories
  const categories = buildCategoryList(budgetCategories);

  const updateMutation = useMutation({
    mutationFn: (updatedTransaction: Transaction) => {
      if (!user?.sub) {
        throw new Error("User ID undefined");
      }

      return updateTransaction(user.sub, updatedTransaction);
    },
  });

  const handleSubmit = () => {
    if (!user?.sub || !transaction?.id) {
      return;
    }

    updateMutation.mutate(
      {
        id: transaction.id,
        date,
        vendor,
        price: amount,
        category,
        userId: user.sub,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["transactions"] });
          handleClose();
        },
      }
    );
  };

  const deleteMutation = useMutation({
    mutationFn: (transactionId: string) => {
      if (!user?.sub) {
        throw new Error("User ID undefined");
      }

      return deleteTransaction(user.sub, transactionId);
    },
  });

  const handleDelete = () => {
    if (!user?.sub || !transaction?.id) {
      return;
    }

    deleteMutation.mutate(transaction.id, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["transactions"] });
        handleClose();
      },
    });
  };

  return (
    <dialog id="edit_transaction_modal" className="modal">
      <div className="modal-box w-full max-w-xl">
        <form method="dialog">
          <button className="btn btn-ghost absolute right-2 top-2">x</button>
        </form>
        <h3 className="font-bold text-lg">Edit Transaction</h3>
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
          <select
            aria-label="Transaction Category"
            className="select input-bordered w-full"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option disabled>Category</option>
            {categories.length &&
              categories.map((category) => {
                return <option key={category}>{category}</option>;
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
