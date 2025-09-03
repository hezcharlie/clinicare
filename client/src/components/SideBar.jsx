import { navLinks, roleBasedPathPermissions } from "@/utils/constants";
import { NavLink, useLocation, useNavigate } from "react-router";
import Logo from "./Logo";
import Logout from "./Logout";
import { useEffect } from "react";

export default function SideBar({ user }) {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;
  const roles = ["patient", "doctor", "admin", "nurse", "staff"];
  // match user role based of our roles array using the find method
  const userRole = roles.find((role) => role === user?.role);
  const isAuthorized =
    (userRole === "admin" && roleBasedPathPermissions.admin.allowedSubpaths) ||
    (userRole === "doctor" &&
      roleBasedPathPermissions.doctor.allowedSubpaths) ||
    (userRole === "patient" &&
      roleBasedPathPermissions.patient.allowedSubpaths) ||
    (userRole === "nurse" && roleBasedPathPermissions.nurse.allowedSubpaths) ||
    (userRole === "staff" && roleBasedPathPermissions.staff.allowedSubpaths);

   useEffect(() => {
    const allowedPaths =
      roleBasedPathPermissions[userRole]?.allowedSubpaths || [];
    const isPathAllowed = allowedPaths.includes(path);
    if (!isAuthorized || !isPathAllowed) {
      navigate("/dashboard");
    }
  }, [isAuthorized, navigate, path, userRole]);

  return (
    <div className="hidden md:block min-h-screen z-50 fixed space-y-2 p-2 w-[200px] px-2 bg-slate-100">
      <div className="mt-2">
        <Logo />
      </div>
      <div className="space-y-3 overflow-y-auto  h-[calc(100vh-120px)]">
        <div>
          {navLinks.map((section) => (
            <div key={section.title}>
              <p className="text-xs font-semibold text-gray-500 my-2">
                {section.title === "Management" && userRole === "patient"
                  ? ""
                  : section.title}
              </p>
              <div>
                {section.links
                  .filter((subPaths) => {
                    if (
                      roleBasedPathPermissions[userRole] &&
                      isAuthorized.includes(subPaths.to)
                    ) {
                      return true;
                    }
                    return false;
                  })
                  .map((link) => (
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
                      viewTransition
                      end
                    >
                      <link.Icon className="w-5 h-5" />
                      <span>{link.label}</span>
                    </NavLink>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Logout />
    </div>
  );
}
