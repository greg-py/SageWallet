const AddModal = () => {
  // Function to open add transaction modal
  const handleAddModalOpen = () => {
    (document.getElementById("add_modal") as HTMLDialogElement)?.showModal();
  };

  return (
    <>
      <button className="btn btn-primary btn-sm" onClick={handleAddModalOpen}>
        Add
      </button>
      <dialog id="add_modal" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">Press ESC key or click on ✕ button to close</p>
        </div>
      </dialog>
    </>
  );
};

export default AddModal;
