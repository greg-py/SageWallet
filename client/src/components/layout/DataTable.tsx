import { Table } from "flowbite-react";

type Column = {
  header: string;
  accessor: string;
};

interface DataTableProps {
  columns: Column[];
  data: object[];
  size?: "small" | "medium" | "large";
}

const DataTable = ({ columns, data, size = "medium" }: DataTableProps) => {
  return (
    <Table>
      <Table.Head>
        {columns &&
          columns.map((col) => {
            return (
              <Table.HeadCell key={col.header}>{col.header}</Table.HeadCell>
            );
          })}
      </Table.Head>
      <Table.Body className="divide-y">
        {data &&
          data.map((item, index) => {
            return (
              <Table.Row
                key={index}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                {columns &&
                  columns.map((col, index) => {
                    const cell = item[col.accessor];
                    if (cell) {
                      return (
                        <Table.Cell
                          key={index}
                          className={`${
                            size === "small"
                              ? "text-xs"
                              : size === "large"
                              ? "text-md"
                              : "text-sm"
                          }`}
                        >
                          {cell}
                        </Table.Cell>
                      );
                    } else {
                      return null;
                    }
                  })}
              </Table.Row>
            );
          })}
      </Table.Body>
    </Table>
  );
};

export default DataTable;
