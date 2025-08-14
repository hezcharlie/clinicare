import Logo from "@/components/Logo"
import { RiCopyrightFill } from "@remixicon/react"
import { Outlet } from "react-router"
import NavBar from "@/pages/home/NavRoot"
 
export default function RootLayout() {
  return (
    <>
    <div className="fixed top-0 right-0 left-0 z-50 bg-white">
        <div className="container mx-auto py-5 px-8 flex justify-between items-center">
            <Logo/>
            <NavBar />
             <button className="btn bg-blue-500 hover:bg-blue-600 text-white">
            <a href="/account/signup">Get Started</a>
          </button>
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
    </>
  )
}
