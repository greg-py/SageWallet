import { useState } from "react";
import { BalancesCategory } from "../../../models/balances";
import CurrencyText from "../../../components/UI/CurrencyText";
import EditModal from "./EditModal";
import { BALANCE_TYPES } from "../../../config/constants";
import { calculateBalanceStats } from "../../../utils/balance";

interface BalancesTableProps {
  balances: BalancesCategory[];
}

const BalancesTable = ({ balances }: BalancesTableProps) => {
  // Component state
  const [id, setId] = useState("");
  const [account, setAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState(BALANCE_TYPES[0]);

  const calculatedBalanceStats = calculateBalanceStats(balances);

  const initializeBalanceEdit = (balance: BalancesCategory) => {
    if (!balance?.id) {
      return;
    }

    setId(balance.id);
    setAccount(balance.account);
    setAmount(balance.amount);
    setType(balance.type);
  };

  const handleEditModalOpen = (balance: BalancesCategory) => {
    initializeBalanceEdit(balance);
    (
      document.getElementById("edit_balance_modal") as HTMLDialogElement
    )?.showModal();
  };

  const handleEditModalClose = () => {
    (
      document.getElementById("edit_balance_modal") as HTMLDialogElement
    )?.close();
  };

  return (
    <>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>User</th>
              <th>Account</th>
              <th>Amount</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {balances &&
              balances.map((balance) => {
                return (
                  <tr
                    key={balance.id}
                    className="hover:cursor-pointer hover:bg-base-200"
                    onClick={() => handleEditModalOpen(balance)}
                  >
                    <th>{balance.user}</th>
                    <th>{balance.account}</th>
                    <th>{<CurrencyText value={balance.amount} />}</th>
                    <th>{balance.type}</th>
                  </tr>
                );
              })}
          </tbody>
          <tfoot className="border-t border-accent">
            <tr>
              <th>Totals</th>
              <th></th>
              <th>
                {
                  <CurrencyText
                    value={calculatedBalanceStats.netWorth?.toString()}
                  />
                }
              </th>
              <th></th>
            </tr>
          </tfoot>
        </table>
      </div>
      <EditModal
        id={id}
        account={account}
        setAccount={setAccount}
        amount={amount}
        setAmount={setAmount}
        type={type}
        setType={setType}
        handleClose={handleEditModalClose}
      />
    </>
  );
};

export default BalancesTable;
