import { Table } from "flowbite-react";
import { BudgetCategory } from "../../../models/BudgetCategory";

const headers = ["Category", "Budget", "Current"];

interface BudgetTableProps {
  data: BudgetCategory[];
}

const BudgetTable = ({ data }: BudgetTableProps) => {
  return (
    <Table>
      <Table.Head>
        {headers.map((header) => {
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
                <Table.Cell className="text-xs">{item.category}</Table.Cell>
                <Table.Cell className="text-xs">
                  {item.budget ? `$${item.budget}` : ""}
                </Table.Cell>
                <Table.Cell className="text-xs">
                  {item.current ? `$${item.current}` : ""}
                </Table.Cell>
              </Table.Row>
            );
          })}
      </Table.Body>
    </Table>
  );
};

export default BudgetTable;
