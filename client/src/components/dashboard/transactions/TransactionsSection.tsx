import { Button } from "flowbite-react";
import { Transaction, TransactionColumns } from "../../../models/Transaction";
import DataTable from "../../layout/DataTable";

interface TransactionsSectionProps {
  data: Transaction[];
}

const TransactionsSection = ({ data }: TransactionsSectionProps) => {
  return (
    <div className="flex flex-col w-full items-center p-4">
      <h5 className="text-xl font-bold pb-4">Transactions</h5>
      <div className="w-full overflow-x-scrollw outline outline-1 rounded-md">
        <DataTable columns={TransactionColumns} data={data} size="small" />
      </div>
      <div className="w-full pt-4">
        <Button>Add New</Button>
      </div>
    </div>
  );
};

export default TransactionsSection;
