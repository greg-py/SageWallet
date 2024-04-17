import { Button, Label, Modal, TextInput, Datepicker } from "flowbite-react";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { DATE_FORMAT_STRING } from "../../../config/constants";

interface EditTransactionModalProps {
  date: string;
  vendor: string;
  price: number;
  category: string;
}

const EditTransactionModal = (props: EditTransactionModalProps) => {
  const [openModal, setOpenModal] = useState(false);
  const [date, setDate] = useState("");
  const [vendor, setVendor] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");

  useEffect(() => {
    if (props) {
      setDate(props.date);
      setVendor(props.vendor);
      setPrice(props.price);
      setCategory(props.category);
    }
  }, [props, openModal]);

  return (
    <>
      <Button size="xs" onClick={() => setOpenModal(true)}>
        Edit
      </Button>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Edit Transaction</Modal.Header>
        <Modal.Body>
          <form className="flex max-w-md flex-col gap-4">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="date" value="Date" />
              </div>
              <Datepicker
                value={date}
                onSelectedDateChanged={(date) => {
                  const formattedDate = format(date, DATE_FORMAT_STRING);
                  setDate(formattedDate);
                }}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="vendor" value="Vendor" />
              </div>
              <TextInput
                id="vendor"
                type="text"
                placeholder="Walmart"
                required
                value={vendor}
                onChange={(e) => setVendor(e.target.value)}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="price" value="Price ($)" />
              </div>
              <TextInput
                id="price"
                type="number"
                required
                value={price}
                onChange={(e) => setPrice(parseFloat(e.target.value))}
              />
            </div>
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
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setOpenModal(false)}>Save</Button>
          <Button color="red" onClick={() => setOpenModal(false)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditTransactionModal;
