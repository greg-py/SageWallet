import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "@tanstack/react-query";
import { Button, Label, Modal, TextInput } from "flowbite-react";
import { useState } from "react";
import { BudgetCategory } from "../../../models/BudgetCategory";
import { queryClient } from "../../../api/queryClient";
import { addBudget } from "../../../api/budget";

const AddBudgetModal = () => {
  const [openModal, setOpenModal] = useState(false);
  const [category, setCategory] = useState("");
  const [budget, setBudget] = useState(0);

  const { user } = useAuth0();

  const clearForm = () => {
    setCategory("");
    setBudget(0);
  };

  const mutation = useMutation({
    mutationFn: (budgetObj: BudgetCategory) => {
      if (!user?.sub) {
        throw new Error("User ID undefined");
      }

      return addBudget(user.sub, budgetObj);
    },
  });

  const handleSubmit = () => {
    if (!user?.sub) {
      return;
    }

    mutation.mutate(
      {
        category,
        budget: budget.toString(),
        userId: user.sub,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["budget"] });
          setOpenModal(false);
          clearForm();
        },
      }
    );
  };

  return (
    <>
      <Button size="xs" onClick={() => setOpenModal(true)}>
        Add
      </Button>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header className="bg-cyan-700 border-slate-300">
          <p className="text-white">Add Budget</p>
        </Modal.Header>
        <Modal.Body className="bg-slate-300">
          <form className="flex max-w-md flex-col gap-4">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="category" value="Category" />
              </div>
              <TextInput
                id="category"
                type="text"
                placeholder="Groceries"
                required
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="budget" value="Budget ($)" />
              </div>
              <TextInput
                id="price"
                type="number"
                required
                value={budget}
                onChange={(e) => setBudget(parseFloat(e.target.value))}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer className="bg-slate-300 border-slate-300">
          <Button onClick={handleSubmit}>Save</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddBudgetModal;
