import Logo from "@/components/Logo"
import Logout from "@/components/Logout"
import { RiCopyrightFill } from "@remixicon/react"
import { Outlet } from "react-router"
 
export default function OnboardingLayout() {
  return (
    <>
   <div className="bg-slate-100">
     <div className=" top-0 right-0 left-0 z-50">
        <div className="container mx-auto py-5 px-4 flex justify-between items-center">
            <Logo/>
            <Logout/>
        </div>
        
    </div>
    <Outlet/>
        <div className="container mx-auto py-5 px-4">
            {/* hr line css - divider */}
            <div className="divider"> </div>
            <div className="flex justify-center gap-1 md:justify-start">
                <RiCopyrightFill size={18} />
                <span className="tex-sm">
                    {new Date().getFullYear()} Clinicare. All rights reserved.
                </span>
            </div>
        </div>
   </div>
    </>
  )
}
