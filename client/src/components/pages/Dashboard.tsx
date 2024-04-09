import { useState, useEffect } from "react";
import StructuredTable from "../layout/Table";
import { budgetData } from "../../data/Budget";
import { incomeData } from "../../data/Income";

const Dashboard = () => {
  const [budgetHeaders, setBudgetHeaders] = useState<string[]>([]);
  const [incomeHeaders, setIncomeHeaders] = useState<string[]>([]);

  // Fetch budget data
  useEffect(() => {
    if (budgetData && budgetData.length) {
      const budgetObject = budgetData[0];
      const budgetLabels = Object.keys(budgetObject);
      setBudgetHeaders(budgetLabels);
    }
  }, [setBudgetHeaders]);

  // Fetch income data
  useEffect(() => {
    if (incomeData && incomeData.length) {
      const incomeObject = incomeData[0];
      const incomeLabels = Object.keys(incomeObject);
      setIncomeHeaders(incomeLabels);
    }
  }, [setIncomeHeaders]);

  return (
    <div className="grid grid-cols-1 space-y-4 lg:grid-cols-2 lg:gap-4 lg:space-y-0">
      <StructuredTable headCells={budgetHeaders} rowData={budgetData} />
      <StructuredTable headCells={incomeHeaders} rowData={incomeData} />
    </div>
  );
};

export default Dashboard;
