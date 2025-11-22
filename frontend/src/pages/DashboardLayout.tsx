import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function DashboardLayout() {
  let location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/dashboard" || location.pathname === "/dashboard/") {
      navigate(`/dashboard/${localStorage.getItem("role_name")}`)
    }
  }, [])

  return (
    <Outlet />
  )
}

export default DashboardLayout;
