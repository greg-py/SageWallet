import { Label, Datepicker, TextInput, Select } from "flowbite-react";

interface NewTransactionFormProps {
  date: string;
  setDate: React.Dispatch<React.SetStateAction<string>>;
  vendor: string;
  setVendor: React.Dispatch<React.SetStateAction<string>>;
  price: number;
  setPrice: React.Dispatch<React.SetStateAction<number>>;
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
}

const NewTransactionForm = (props: NewTransactionFormProps) => {
  const {
    date,
    setDate,
    vendor,
    setVendor,
    price,
    setPrice,
    category,
    setCategory,
  } = props;

  const categoryOptions = [
    "Rent",
    "Utilities",
    "Groceries",
    "Restaurants",
    "Shopping",
    "Subscriptions",
    "Automotive",
    "Medical",
    "Student Loans",
    "Unexpected",
    "Travel",
  ];

  return (
    <form className="flex max-w-md flex-col gap-4">
      <div>
        <div className="mb-2 block">
          <Label htmlFor="date" value="Date" />
        </div>
        <Datepicker
          id="date"
          required
          value={date}
          onSelectedDateChanged={(date) => {
            const dateString = date.toISOString()?.slice(0, 10);
            setDate(dateString);
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
          placeholder="eg: Walmart"
          required
          value={vendor}
          onChange={(e) => setVendor(e.target.value)}
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="price" value="Price" />
        </div>
        <TextInput
          id="price"
          type="number"
          required
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="category" value="Category" />
        </div>
        <Select
          id="category"
          required
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categoryOptions.length &&
            categoryOptions.map((option) => {
              return (
                <option key={option} value={option}>
                  {option}
                </option>
              );
            })}
        </Select>
      </div>
    </form>
  );
};

export default NewTransactionForm;
