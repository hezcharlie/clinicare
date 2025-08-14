import { RiCloseLine, RiMenuLine } from "@remixicon/react";
import { useState } from "react";
import { NavLink } from "react-router";
import ErrorAlert from "./ErrorAlert";
import { navLinks } from "@/utils/constants";

export default function Drawer({ error }) {
  const [open, setOpen] = useState(false);


  const toggleDrawer = () => setOpen(!open);

  return (
    <div className="md:hidden">
      <button onClick={toggleDrawer}>
        <RiMenuLine size={24} />
      </button>
      <div
        className={`drawer fixed top-0 left-0 z-50 ${
          open ? "drawer-open" : ""
        }`}
      >
        <input
          type="checkbox"
          className="drawer-toggle"
          checked={open}
          onChange={toggleDrawer}
        />
        <div className="drawer-side">
          <label
            className="drawer-overlay"
            onClick={() => setOpen(false)}
          ></label>
          <div className="menu bg-base-200 text-base-content min-h-full w-[100vw] p-4">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-4"
              type="button"
              onClick={toggleDrawer}
            >
              <RiCloseLine size={24} />
            </button>
            {error && <ErrorAlert error={error} />}
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
      </div>
    </div>
  );
}
