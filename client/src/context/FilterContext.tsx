import React, { createContext, ReactNode, useState } from "react";
import { useFilterData } from "../hooks/useFilterData";
// import { tokenQuery } from "../api/queries";

interface FilterContextType {
  filterOptions: object;
  isPending: boolean;
  error: Error | null;
  filterMonth: number;
  setFilterMonth: React.Dispatch<React.SetStateAction<number>>;
  filterYear: number;
  setFilterYear: React.Dispatch<React.SetStateAction<number>>;
}

export const FilterContext = createContext<FilterContextType | undefined>(
  undefined
);

export const FilterProvider = ({ children }: { children: ReactNode }) => {
  const { isPending, error, data: filterOptions } = useFilterData();
  const [filterMonth, setFilterMonth] = useState<number>(new Date().getMonth());
  const [filterYear, setFilterYear] = useState<number>(
    new Date().getFullYear()
  );

  return (
    <FilterContext.Provider
      value={{
        filterOptions,
        isPending,
        error,
        filterMonth,
        setFilterMonth,
        filterYear,
        setFilterYear,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
