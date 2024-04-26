import BudgetTable from "./BudgetTable";

export const BudgetGrid = () => {
  return (
    <div className="mt-4 grid grid-cols-12 h-96 gap-4 md:mt-6 md:gap-6 2xl:mt-8 2xl:gap-8">
      {/* Transactions list */}
      <div className="col-span-12 rounded-2xl max-h-full bg-base-100 outline outline-1 outline-slate-200 overflow-y-scroll p-8 shadow-xl xl:col-span-6"></div>
      <div className="col-span-12 rounded-2xl max-h-full bg-base-100 outline outline-1 outline-slate-200 overflow-y-scroll p-8 shadow-xl xl:col-span-6">
        <BudgetTable />
      </div>
    </div>
  );
};

export default BudgetGrid;
