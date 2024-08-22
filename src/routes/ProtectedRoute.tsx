import { useEffect, ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { RootState } from "@store/Store";

interface ProtectedRouteProps {
  requiredRole: string;
  children: ReactNode; // Type for children
}

export default function ProtectedRoute({
  requiredRole,
  children,
}: ProtectedRouteProps) {
  const { AuthModel } = useSelector((state: RootState) => state.Auth);
  const userRole = AuthModel?.roles[0];
  useEffect(() => {
    if (userRole !== requiredRole) {
      toast.error("غير مسموح لك بدخول هذه الصفحه");
    }
  }, [userRole, requiredRole]);

  if (userRole !== requiredRole) {
    return <Navigate to="/" replace={true} />;
  }

  return <>{children}</>;
}
