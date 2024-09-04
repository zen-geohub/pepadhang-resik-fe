import { LoginData } from "@/contexts/LoginContext";
import { useContext } from "react";

export const useLogin = () => {
  const context = useContext(LoginData);

  if (context === undefined)
    throw new Error("useLogin must be used within a LoginProvider");

  return context;
};
