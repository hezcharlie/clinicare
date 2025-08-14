
import { Outlet } from "react-router"
import Logo from "@/components/Logo"
import { RiCopyrightFill } from "@remixicon/react"

export default function AuthLayout() {
  return (
    <div className="bg-slate-100 min-h-100 flex flex-col">
    {/* don't use your max-width on the fixed div unless it won't work */}
    <div className="top-0 left-0 right-0">
      <div className="container mx-auto py-5 px-4 flex justify-between items-center">
        <Logo/>
    
    </div>
    </div>
    
         <Outlet/>

    <div className="container mx-auto py-10 lg:py-2 px-4 ">
        <div className="flex justify-center md:justify-start">
            <RiCopyrightFill size={18} className="text-gray-700"/>
            <span className="text-sm text-gray-700">{new Date().getFullYear()} Clinicare.All rights reserved.</span>
        </div>
    </div>
    </div>
  )
}
