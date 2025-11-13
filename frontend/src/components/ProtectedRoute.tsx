import type { JSX } from "react";
import UrlNotFound from "../pages/UrlNotFound";

interface ProtectedRouteProps {
  allowedRoles: string[]; // daftar role yang boleh akses
  children: JSX.Element;
}

const ProtectedRoute = ({ allowedRoles, children }: ProtectedRouteProps) => {
  const role = localStorage.getItem("role_name"); // misalnya diset saat login

  if (!role) {
    return <UrlNotFound />;
  }

  if (!allowedRoles.includes(role)) {
    return <UrlNotFound />;
  }

  return children;
};

export default ProtectedRoute;

