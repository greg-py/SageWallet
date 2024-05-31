import { useQuery } from "@tanstack/react-query";
import { useAuth } from "./useAuth";
import { filterOptionsQuery, tokenQuery } from "../api/queries";

export const useFilterData = () => {
  const { user } = useAuth();

  const { data: token } = useQuery(tokenQuery(user!));

  const { isPending, error, data } = useQuery(
    filterOptionsQuery(user!, token!)
  );

  return {
    isPending,
    error,
    data,
  };
};
