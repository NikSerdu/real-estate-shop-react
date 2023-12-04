import { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const PrivateRoute: FC = () => {
  const { user } = useAuth();
  return <div>{user ? <Outlet /> : <Navigate to={"/"} />}</div>;
};

export default PrivateRoute;
