interface FilterModalProps {
  categories: string[];
  filterCategories: string[];
  setFilterCategories: React.Dispatch<React.SetStateAction<string[]>>;
}

const FilterModal = ({
  categories,
  filterCategories,
  setFilterCategories,
}: FilterModalProps) => {
  // Function to open category filter modal
  const handleFilterModalOpen = () => {
    (document.getElementById("filter_modal") as HTMLDialogElement)?.showModal();
  };

  const handleFilterCategory = (category: string) => {
    if (filterCategories.includes(category)) {
      const categoryRemoved = filterCategories.filter(
        (value) => value !== category
      );
      setFilterCategories(categoryRemoved);
    } else {
      setFilterCategories([...filterCategories, category]);
    }
  };

  return (
    <>
      <button className="btn btn-sm" onClick={handleFilterModalOpen}>
        Filter
      </button>
      <dialog id="filter_modal" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Filter Transactions</h3>
          <ul className="h-64 menu">
            {categories &&
              categories.map((category) => {
                return (
                  <li
                    key={category}
                    className={
                      filterCategories.includes(category)
                        ? "bg-primary rounded-lg"
                        : ""
                    }
                  >
                    <a onClick={() => handleFilterCategory(category)}>
                      {category}
                    </a>
                  </li>
                );
              })}
          </ul>
        </div>
      </dialog>
    </>
  );
};

export default FilterModal;
