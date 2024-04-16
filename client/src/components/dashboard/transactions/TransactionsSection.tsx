import { useState } from "react";
import { Transaction, TransactionColumns } from "../../../models/Transaction";
import DataTable from "../../layout/DataTable";
import TransactionsModal from "./TransactionsModal";
import { Button, Modal } from "flowbite-react";

interface TransactionsSectionProps {
  data: Transaction[];
  setData: React.Dispatch<React.SetStateAction<Transaction[]>>;
}

const TransactionsSection = ({ data, setData }: TransactionsSectionProps) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="flex flex-col w-full items-center p-4">
      <h5 className="text-xl font-bold pb-4">Transactions</h5>
      <div className="w-full overflow-x-scroll outline outline-1 rounded-md">
        <DataTable columns={TransactionColumns} data={data} size="small" />
      </div>
      <div className="w-full pt-4">
        <Button onClick={() => setOpenModal(true)}>Add new</Button>
        <Modal show={openModal} onClose={() => setOpenModal(false)}>
          <TransactionsModal
            data={data}
            setData={setData}
            handleClose={() => setOpenModal(false)}
          />
        </Modal>
      </div>
    </div>
  );
};

export default TransactionsSection;
