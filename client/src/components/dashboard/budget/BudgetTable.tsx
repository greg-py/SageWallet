import { Table } from "flowbite-react";
import { BudgetCategory } from "../../../models/BudgetCategory";

const headers = ["Category", "Budget", "Current"];

interface BudgetTableProps {
  data: BudgetCategory[];
}

const BudgetTable = ({ data }: BudgetTableProps) => {
  // Sort data by budget amount
  data && data.sort((a, b) => parseInt(b.budget) - parseInt(a.budget));

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
              <>
                <Table.Row key={item.id}>
                  <Table.Cell className="py-2">{item.category}</Table.Cell>
                  <Table.Cell className="py-2">
                    {item.budget ? `$${parseInt(item.budget)}` : ""}
                  </Table.Cell>
                  <Table.Cell
                    className={
                      item.current &&
                      parseInt(item.current) <= parseInt(item.budget)
                        ? `bg-emerald-300 py-2`
                        : `bg-red-300 py-2`
                    }
                  >
                    {item.current ? `$${parseInt(item.current)}` : ""}
                  </Table.Cell>
                </Table.Row>
              </>
            );
          })}
      </Table.Body>
    </Table>
  );
};

export default BudgetTable;
