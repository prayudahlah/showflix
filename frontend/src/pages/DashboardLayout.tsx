import { Outlet, useLocation, useNavigate } from "react-router-dom";
import StarsBg from "../components/StarsBg";
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
    <div className="flex justify-center items-center min-h-screen relative overflow-hidden bg-[#010109]">
      <StarsBg />
      <Outlet />
    </div>
  )
}

export default DashboardLayout;
