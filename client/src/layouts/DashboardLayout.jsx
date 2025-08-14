import { Outlet } from "react-router";
import NavBar from "@/components/NavBar";
import SideBar from "@/components/SideBar";
import { useAuth } from "@/contextStore";

export default function DashboardLayout() {
  const { user } = useAuth
  return (
    <div className="bg-slate-100 min-h-[100vh] flex px-2 py-2">
    {/* don't use your max-width on the fixed div unless it won't work */}
    <SideBar />
    <div className="ml-[200px] flex-1">
      <NavBar user={ user } />
       <Outlet/>
    </div>
    </div>
  )
}
