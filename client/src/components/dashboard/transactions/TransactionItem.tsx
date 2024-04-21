import { useState } from "react";
import { Transaction } from "../../../models/Transaction";
import { Badge } from "flowbite-react";
import EditTransactionModal from "./EditTransactionModal";

interface TransactionItemProps {
  transaction: Transaction;
}

const TransactionItem = ({ transaction }: TransactionItemProps) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <div
        className="px-4 py-2 rounded-md grid grid-cols-3 hover:bg-gray-100 hover:cursor-pointer"
        onClick={() => setOpenModal(true)}
      >
        <p className="col-span-2 text-xs font-bold">{transaction.vendor}</p>
        <div className="col-span-1 flex flex-row justify-between">
          <Badge>{transaction.category}</Badge>
          <p className="text-xs font-bold">${transaction.price}</p>
        </div>
      </div>
      <EditTransactionModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        transaction={transaction}
      />
    </>
  );
};

export default TransactionItem;
