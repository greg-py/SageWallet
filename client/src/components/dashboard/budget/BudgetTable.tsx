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
          return (
            <Table.HeadCell className="bg-cyan-700 text-white" key={header}>
              {header}
            </Table.HeadCell>
          );
        })}
      </Table.Head>
      <Table.Body className="divide-y">
        {data &&
          data.map((item) => {
            return (
              <Table.Row
                key={item.id}
                className="bg-slate-200 text-xs text-black hover:cursor-pointer hover:bg-slate-300"
              >
                <Table.Cell>{item.category}</Table.Cell>
                <Table.Cell>
                  {item.budget ? `$${parseInt(item.budget)}` : ""}
                </Table.Cell>
                <Table.Cell>
                  {item.current ? `$${parseInt(item.current)}` : ""}
                </Table.Cell>
              </Table.Row>
            );
          })}
      </Table.Body>
    </Table>
  );
};

export default BudgetTable;
