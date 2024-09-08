import { DataContext } from "@/contexts/DataContext";
import { useContext } from "react";

export const useData = () => {
  const context = useContext(DataContext);

  if (context === undefined)
    throw new Error("useData must be used within a DataProvider");

  return context;
};