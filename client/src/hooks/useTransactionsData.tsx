import { useQueries, useQuery } from "@tanstack/react-query";
import { useAuth } from "./useAuth";
import { budgetQuery, tokenQuery, transactionsQuery } from "../api/queries";

export const useTransactionsData = (
  filterMonth: number,
  filterYear: number
) => {
  const { user } = useAuth();

  const { data: token } = useQuery(tokenQuery(user!));

  const queries = useQueries({
    queries: [
      budgetQuery(user!, token!),
      transactionsQuery(user!, filterMonth, filterYear, token!),
    ],
  });

  const isPending = queries.some((query) => query.isPending);
  const error = queries.find((query) => query.error)?.error;

  return {
    budgetData: queries[0].data,
    transactionsData: queries[1].data,
    isPending,
    error,
  };
};
