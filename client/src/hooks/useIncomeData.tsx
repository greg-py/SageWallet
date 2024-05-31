import { useQuery } from "@tanstack/react-query";
import { useAuth } from "./useAuth";
import { tokenQuery } from "../api/queries";
import { incomeQuery } from "../api/queries/defs/income";

export const useIncomeData = (filterMonth: number, filterYear: number) => {
  const { user } = useAuth();

  const { data: token } = useQuery(tokenQuery(user!));

  const { isPending, error, data } = useQuery(
    incomeQuery(user!, filterMonth, filterYear, token!)
  );

  return {
    isPending,
    error,
    data,
  };
};
