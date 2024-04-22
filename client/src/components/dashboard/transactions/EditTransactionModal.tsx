import { Button, Label, Modal, TextInput, Datepicker } from "flowbite-react";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { DATE_FORMAT_STRING } from "../../../config/constants";
import { useMutation } from "@tanstack/react-query";
import {
  deleteTransaction,
  updateTransaction,
} from "../../../api/transactions";
import { useAuth0 } from "@auth0/auth0-react";
import { Transaction } from "../../../models/Transaction";
import { queryClient } from "../../../api/queryClient";

interface EditTransactionModalProps {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  transaction: Transaction;
}

const EditTransactionModal = ({
  openModal,
  setOpenModal,
  transaction,
}: EditTransactionModalProps) => {
  const [date, setDate] = useState("");
  const [vendor, setVendor] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");

  const { user } = useAuth0();

  const updateMutation = useMutation({
    mutationFn: (transactionObj: Transaction) => {
      if (!user?.sub) {
        throw new Error("User ID undefined");
      }

      return updateTransaction(user.sub, transactionObj);
    },
  });

  const handleSubmit = () => {
    if (!user?.sub) {
      return;
    }

    updateMutation.mutate(
      {
        id: transaction.id,
        date,
        vendor,
        price: price.toString(),
        category,
        userId: user.sub,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["transactions"] });
          setOpenModal(false);
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
    if (!user?.sub || !transaction.id) {
      return;
    }

    deleteMutation.mutate(transaction.id, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["transactions"] });
        setOpenModal(false);
      },
    });
  };

  // Set current input values on modal open from props
  useEffect(() => {
    if (transaction) {
      setDate(transaction.date);
      setVendor(transaction.vendor);
      setPrice(parseFloat(transaction.price));
      setCategory(transaction.category);
    }
  }, [transaction, openModal]);

  return (
    <Modal show={openModal} onClose={() => setOpenModal(false)}>
      <Modal.Header className="bg-cyan-700 border-slate-300">
        <p className="text-white">Edit Transaction</p>
      </Modal.Header>
      <Modal.Body className="bg-slate-300 border-slate-300">
        <form className="flex max-w-md flex-col gap-4">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="date" value="Date" />
            </div>
            <Datepicker
              value={date && format(date, DATE_FORMAT_STRING)}
              onSelectedDateChanged={(date) => {
                const formattedDate = date.toISOString();
                setDate(formattedDate);
              }}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="vendor" value="Vendor" />
            </div>
            <TextInput
              id="vendor"
              type="text"
              placeholder="Walmart"
              required
              value={vendor}
              onChange={(e) => setVendor(e.target.value)}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="price" value="Price ($)" />
            </div>
            <TextInput
              id="price"
              type="number"
              required
              value={price}
              onChange={(e) => setPrice(parseFloat(e.target.value))}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="category" value="Category" />
            </div>
            <TextInput
              id="category"
              type="text"
              placeholder="Groceries"
              required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer className="bg-slate-300 border-slate-300">
        <Button onClick={handleSubmit}>Save</Button>
        <Button color="red" onClick={handleDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditTransactionModal;
