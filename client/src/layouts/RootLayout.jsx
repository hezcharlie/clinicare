import Logo from "@/components/Logo";
import { RiCopyrightFill, RiMenuLine, RiPhoneLine } from "@remixicon/react";
import { Link, Outlet } from "react-router";
import NavBar from "@/pages/home/NavRoot";
import { useState } from "react";

export default function RootLayout() {
  const [openOptions] = useState(false);

  return (
    <>
      <div className="fixed top-0 right-0 left-0 z-50 bg-white">
        <div className="container mx-auto py-5 px-8 flex justify-between items-center">
          <Logo />
          <NavBar />
          <button className="btn hidden md:block bg-blue-500 hover:bg-blue-600 text-white">
            <a href="/account/signup">Get Started</a>
          </button>

          <div className="md:hidden">
            <div
              className={`dropdown dropdown-end ${
                openOptions ? "dropdown-open" : ""
              }`}
            >
              <div
                tabIndex={0}
                role="button"
                className="btn m-1 border border-gray-300"
              >
                <RiMenuLine className="text-gray-500" />
              </div>
              <div
                tabIndex={0}
                className="dropdown-content menu  backdrop-blur supports-[backdrop-filter]:bg-black/10 rounded-box z-1 w-[130px]  p-2 shadow-2xl"
              >
                <div className=" flex flex-col justify-center items-center space-y-2">
                  <Link
                    to="/"
                    className={({ isActive }) =>
                      isActive
                        ? " text-blue-500"
                        : "text-zinc-600  hover:text-gray-600 transition"
                    }
                  >
                   <b> Features</b>
                  </Link>
                  <Link
                    to="#how-it-works"
                    className=" text-gray-600 font-bold hover:text-gray-600 transition"
                  >
                    How it works
                  </Link>
                  <Link
                    to="/contact"
                    className=" text-red-500 hover:text-red-700 transition flex items-center font-bold"
                  >
                   <RiPhoneLine size={15}/>  Contact Us
                  </Link>
                   <button className="btn bg-blue-500 hover:bg-blue-600 text-white border-1 border-black-400 w-full font-bold">
            <a href="/account/signup">Sign up</a>
          </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Outlet />
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
  );
}
