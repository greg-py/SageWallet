import { useState } from "react";
import { Modal, Button } from "flowbite-react";
import NewTransactionForm from "./NewTransactionForm";
import { Transaction } from "../../../models/Transaction";
import { formatTransactionsData } from "../../../utils/formatData";

interface TransactionsModalProps {
  data: Transaction[];
  setData: React.Dispatch<React.SetStateAction<Transaction[]>>;
  handleClose: () => void;
}

const TransactionsModal = ({
  data,
  setData,
  handleClose,
}: TransactionsModalProps) => {
  const [date, setDate] = useState("");
  const [vendor, setVendor] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");

  const url = "http://localhost:3000/Transactions";

  const handleSubmit = async () => {
    const transaction = { date, vendor, price, category };
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transaction),
      });

      if (response.ok) {
        const addedTransaction = await response.json();
        const combinedData = [addedTransaction, ...data];
        const formattedData = formatTransactionsData(combinedData);
        setData(formattedData);
        handleClose();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Modal.Header>New Transaction</Modal.Header>
      <Modal.Body>
        <NewTransactionForm
          date={date}
          setDate={setDate}
          vendor={vendor}
          setVendor={setVendor}
          price={price}
          setPrice={setPrice}
          category={category}
          setCategory={setCategory}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => handleSubmit()}>Submit</Button>
      </Modal.Footer>
    </>
  );
};

export default TransactionsModal;
