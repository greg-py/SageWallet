import { Button, Label, Modal, TextInput, Datepicker } from "flowbite-react";
import { useState } from "react";
import { format } from "date-fns";
import { DATE_FORMAT_STRING } from "../../../config/constants";
import { useMutation } from "@tanstack/react-query";
import { Transaction } from "../../../models/Transaction";
import { useAuth0 } from "@auth0/auth0-react";
import { addTransaction } from "../../../api/transactions";
import { queryClient } from "../../../api/queryClient";

const AddTransactionModal = () => {
  const [openModal, setOpenModal] = useState(false);
  const [date, setDate] = useState("");
  const [vendor, setVendor] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");

  const { user } = useAuth0();

  const clearForm = () => {
    setDate("");
    setVendor("");
    setPrice(0);
    setCategory("");
  };

  const mutation = useMutation({
    mutationFn: (transactionObj: Transaction) => {
      if (!user?.sub) {
        throw new Error("User ID undefined");
      }

      return addTransaction(user.sub, transactionObj);
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
        price: price.toString(),
        category,
        userId: user.sub,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["transactions"] });
          setOpenModal(false);
          clearForm();
        },
      }
    );
  };

  return (
    <>
      <Button onClick={() => setOpenModal(true)}>Add</Button>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header className="bg-cyan-700 border-slate-300">
          <p className="text-white">Add Transaction</p>
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
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddTransactionModal;
