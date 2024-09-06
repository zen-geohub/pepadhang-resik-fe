import { Navigate, Outlet } from "react-router-dom";
import { useLogin } from "./hooks/useLogin";
import { FC } from "react";

interface ProtectedRouteProps {
  redirectPath?: string;
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({
  redirectPath = "/",
}) => {
  const { isLogin } = useLogin();

  if (isLogin.role !== "admin") {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
