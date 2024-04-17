import { Table } from "flowbite-react";
import { Transaction } from "../../../models/Transaction";
import EditTransactionModal from "./EditTransactionModal";

const transactionsHeaders = ["Date", "Vendor", "Price", "Category", ""];

interface TransactionsTableProps {
  data: Transaction[];
}

const TransactionsTable = ({ data }: TransactionsTableProps) => {
  return (
    <Table>
      <Table.Head>
        {transactionsHeaders.map((header) => {
          return <Table.HeadCell key={header}>{header}</Table.HeadCell>;
        })}
      </Table.Head>
      <Table.Body className="divide-y">
        {data &&
          data.map((item) => {
            return (
              <Table.Row
                key={item.id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell className="text-xs">{item.date}</Table.Cell>
                <Table.Cell className="text-xs">{item.vendor}</Table.Cell>
                <Table.Cell className="text-xs">${item.price}</Table.Cell>
                <Table.Cell className="text-xs">{item.category}</Table.Cell>
                <Table.Cell>
                  <EditTransactionModal
                    date={item.date}
                    vendor={item.vendor}
                    price={item.price}
                    category={item.category}
                  />
                </Table.Cell>
              </Table.Row>
            );
          })}
      </Table.Body>
    </Table>
  );
};

export default TransactionsTable;
