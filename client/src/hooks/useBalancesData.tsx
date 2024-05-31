import { useQuery } from "@tanstack/react-query";
import { useAuth } from "./useAuth";
import { balancesQuery, tokenQuery } from "../api/queries";

export const useBalancesData = () => {
  const { user } = useAuth();

  const { data: token } = useQuery(tokenQuery(user!));

  const { isPending, error, data } = useQuery(balancesQuery(user!, token!));

  return {
    isPending,
    error,
    data,
  };
};
