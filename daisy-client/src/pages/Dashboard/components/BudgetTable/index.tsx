import { BudgetCategory } from "../../../../models/budget";

interface BudgetTableProps {
  data: BudgetCategory[];
}

const BudgetTable = ({ data }: BudgetTableProps) => {
  return (
    <div className="col-span-12 rounded-2xl max-h-full bg-base-100 overflow-y-scroll p-8 shadow-xl xl:col-span-6">
      <h2 className="font-bold text-xl">Budget</h2>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Budget</th>
              <th>Current</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((category) => {
                return (
                  <tr key={category.id}>
                    <th>{category.category}</th>
                    <th>
                      {typeof category.budget === "string"
                        ? `$${category.budget}`
                        : "$0"}
                    </th>
                    <th>
                      {typeof category.current === "string"
                        ? `$${category.current}`
                        : "$0"}
                    </th>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BudgetTable;
