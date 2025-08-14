import { navLinks } from "@/utils/constants";
import React from "react";
import { NavLink } from "react-router";
import Logo from "./Logo";
import Logout from "./Logout";

export default function SideBar() {
  return (
    <div className="container mx-auto h-[calc(100vh-7px)] fixed space-y-2 p-2 w-[200px] px-3">
        <div className="pb-2">
            <Logo />
        </div>
    <div className="space-y-16 overflow-y-auto">
       <div>
         {navLinks.map((section) => (
        <div key={section.title}>
          <p className="text-xs font-semibold text-gray-500 my-2">
            {section.title}
          </p>
          <div>
            {section.links.map((link) => (
              <NavLink
                key={link.id}
                to={link.to}
                className={({ isActive }) =>
                  `${
                    isActive ? "bg-blue-300 font-bold text-white" : ""
                  } px-2 py-2 rounded-full hover:bg-blue-200 text-gray-700 flex items-center gap-2 text-sm`
                }
              >
                <link.icon className="w-5 h-5" />
                <span>{link.label}</span>
              </NavLink>
            ))}
          </div>
        </div>
      ))}
       </div>
       <div>
        <Logout />
      </div>
    </div>
    </div>
  );
}
