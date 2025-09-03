import { RiCloseLine, RiMenuLine } from "@remixicon/react";
import { useState } from "react";
import { NavLink } from "react-router"; // <-- FIXED
import { navLinks } from "@/utils/constants";
import Logo from "../Logo";
import Logout from "../Logout";

export default function Drawer() {
  const [open, setOpen] = useState(false);
  const path = location.pathname;

  const toggleDrawer = () => setOpen(!open);

  return (
    <div className="md:hidden ">
      <button onClick={toggleDrawer}>
        <RiMenuLine size={24} />
      </button>
      <div
        className={`drawer fixed top-0 left-0 z-50 ${
          open ? "drawer-open" : ""
        }`}
      >
        <input
          id="main-drawer"
          type="checkbox"
          className="drawer-toggle"
          checked={open}
          onChange={toggleDrawer}
        />
        <div className="drawer-content">
          {/* Optionally, you can put your main page content here */}
        </div>
        <div className="drawer-side">
          <label
            htmlFor="main-drawer"
            className="drawer-overlay"
            onClick={() => setOpen(false)}
          ></label>
          <div className="menu bg-base-200 text-base-content min-h-full w-[80vw] max-w-xs p-4">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-4"
              type="button"
              onClick={toggleDrawer}
            >
              <RiCloseLine size={24} />
            </button>
            <Logo />
            <div className="space-y-16 overflow-y-auto mt-8">
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
                            `hover:text-blue-600 text-gray-700 ${
                              isActive || path.split("/")[2] === link.to
                                ? "bg-blue-500 font-bold text-white rounded-full"
                                : ""
                            } px-2 py-2 flex items-center gap-2 text-sm`
                          }
                          onClick={() => setOpen(false)}
                        >
                          <link.Icon className="w-5 h-5" />
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
        </div>
      </div>
    </div>
  );
}
