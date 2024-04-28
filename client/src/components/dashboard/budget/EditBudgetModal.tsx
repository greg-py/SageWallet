import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { BudgetCategory } from "../../../models/BudgetCategory";
import { deleteBudget, updateBudget } from "../../../api/budget";
import { queryClient } from "../../../api/queryClient";
import { Button, Label, Modal, TextInput } from "flowbite-react";

interface EditBudgetModalProps {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  budget: BudgetCategory;
}

const EditBudgetModal = ({
  openModal,
  setOpenModal,
  budget,
}: EditBudgetModalProps) => {
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);

  const { user } = useAuth0();

  const updateMutation = useMutation({
    mutationFn: (budgetObj: BudgetCategory) => {
      if (!user?.sub) {
        throw new Error("User ID undefined");
      }

      return updateBudget(user.sub, budgetObj);
    },
  });

  const handleSubmit = () => {
    if (!user?.sub) {
      return;
    }

    updateMutation.mutate(
      {
        id: budget.id,
        category,
        budget: price.toString(),
        userId: user.sub,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["budgets"] });
          setOpenModal(false);
        },
      }
    );
  };

  const deleteMutation = useMutation({
    mutationFn: (budgetId: string) => {
      if (!user?.sub) {
        throw new Error("User ID undefined");
      }

      return deleteBudget(user.sub, budgetId);
    },
  });

  const handleDelete = () => {
    if (!user?.sub || !budget.id) {
      return;
    }

    deleteMutation.mutate(budget.id, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["budgets"] });
        setOpenModal(false);
      },
    });
  };

  // Set current input values on modal open from props
  useEffect(() => {
    if (budget) {
      setCategory(budget.category);
      setPrice(parseFloat(budget.budget));
    }
  }, [budget, openModal]);

  return (
    <Modal show={openModal} onClose={() => setOpenModal(false)}>
      <Modal.Header className=" border-base-300">
        <p>Edit Budget</p>
      </Modal.Header>
      <Modal.Body>
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
              id="budget"
              type="number"
              required
              value={price}
              onChange={(e) => setPrice(parseFloat(e.target.value))}
            />
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleSubmit}>Save</Button>
        <Button color="red" onClick={handleDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditBudgetModal;
