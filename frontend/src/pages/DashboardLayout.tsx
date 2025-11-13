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
    <div className="flex justify-center items-center min-h-screen relative overflow-hidden bg-primary1-2">
      <Outlet />
    </div>
  )
}

export default DashboardLayout;
