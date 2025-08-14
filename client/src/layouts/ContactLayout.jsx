import React from 'react'
import { NavLink } from 'react-router'
import Logo from '@/components/Logo'
import { RiCopyrightFill } from '@remixicon/react'
import { Outlet } from 'react-router'

export default function ContactUs() {
  return (
    <div>
         <>
    <div className="fixed top-0 right-0 left-0 z-50 bg-white">
        <div className="container mx-auto py-5 px-4 flex justify-between items-center">
            <Logo/>
            <NavLink
  to="/contact"
  className={({ isActive,}) =>
    isActive ? "text-blue-500" : "text-zinc-600 hover:text-blue-600 transition"
  }
>
  Contact Us
</NavLink>
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
    </div>
  )
}
