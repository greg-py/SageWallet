interface EditButtonProps {
  editEnabled: boolean;
  setEditEnabled: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditButton = ({ editEnabled, setEditEnabled }: EditButtonProps) => {
  return (
    <button
      className={`btn btn-sm ${editEnabled ? "btn-error" : "btn-accent"}`}
      onClick={() => setEditEnabled((prevState) => !prevState)}
    >
      {editEnabled ? "Done" : "Edit"}
    </button>
  );
};

export default EditButton;
