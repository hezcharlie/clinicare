import { Outlet } from "react-router";
import NavBar from "@/components/NavBar";

import { useAuth } from "@/contextStore";
import SideBar from "@/components/SideBar";
import MobileNav from "@/components/mobileView/MobileNav";

export default function DashboardLayout() {
  const { user } = useAuth()
  return (
    <div className="bg-slate-100 min-h-[100dvh] flex ">
    {/* don't use your max-width on the fixed div unless it won't work */}
    <SideBar user={user} />
    <div className="md:ml-[200px] flex-1 md:px-4 ">
      <NavBar user={ user } />
      <MobileNav/>
       <Outlet/>
    </div>
    </div>
  )
}
