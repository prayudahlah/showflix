import { Outlet } from "react-router-dom";
import StarsBg from "../components/StarsBg";

function DashboardLayout() {
  return (
    <div className="flex justify-center items-center min-h-screen relative overflow-hidden bg-[#010109]">
      <StarsBg />
      <Outlet />
    </div>
  )
}

export default DashboardLayout;
