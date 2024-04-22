import Categories from "./Categories";

const ChartSection = () => {
  return (
    <div className="p-4 mt-4 rounded-md outline outline-1 outline-slate-300 flex flex-col space-y-4">
      <div className="h-64 grid grid-cols-1 grid-rows-3 lg:grid-cols-3 lg:grid-rows-1 gap-4">
        <Categories />
        <Categories />
        <Categories />
      </div>
    </div>
  );
};

export default ChartSection;
