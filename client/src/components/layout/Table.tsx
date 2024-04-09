"use client";

import { Table } from "flowbite-react";

interface StructuredTableProps {
  headCells: string[];
  rowData: object[];
}

const StructuredTable = ({ headCells, rowData }: StructuredTableProps) => {
  return (
    <div className="overflow-x-auto">
      <Table striped>
        <Table.Head>
          {headCells.length &&
            headCells.map((item) => {
              return <Table.HeadCell key={item}>{item}</Table.HeadCell>;
            })}
        </Table.Head>
        <Table.Body className="divide-y">
          {rowData.length &&
            rowData.map((item) => {
              return (
                <Table.Row>
                  {Object.values(item).map((value) => {
                    return <Table.Cell>{value}</Table.Cell>;
                  })}
                </Table.Row>
              );
            })}
        </Table.Body>
      </Table>
    </div>
  );
};

export default StructuredTable;
