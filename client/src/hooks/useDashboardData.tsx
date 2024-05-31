import { useQueries, useQuery } from "@tanstack/react-query";
import { useAuth } from "./useAuth";
import {
  balancesQuery,
  budgetQuery,
  tokenQuery,
  transactionsQuery,
} from "../api/queries";
import { incomeQuery } from "../api/queries/defs/income";

export const useDashboardData = (filterMonth: number, filterYear: number) => {
  const { user } = useAuth();

  const { data: token } = useQuery(tokenQuery(user!));

  const queries = useQueries({
    queries: [
      budgetQuery(user!, token!),
      transactionsQuery(user!, filterMonth, filterYear, token!),
      incomeQuery(user!, filterMonth, filterYear, token!),
      balancesQuery(user!, token!),
    ],
  });

  const isPending = queries.some((query) => query.isPending);
  const error = queries.find((query) => query.error)?.error;

  return {
    budgetData: queries[0].data,
    transactionsData: queries[1].data,
    incomeData: queries[2].data,
    balancesData: queries[3].data,
    isPending,
    error,
  };
};
