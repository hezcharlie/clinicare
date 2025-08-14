import { RiSearchLine } from "@remixicon/react";
import { getTimeBasedGreeting } from "@/utils/constants";

export default function NavBar({ user }) {
  const greeting = getTimeBasedGreeting();
  return (
    <div className="hidden lg:block bg-white border border-zinc-200 rounded-full sticky top-2 left-[200px] right-0 backdrop-blur supports-[backdrop-filter]:bg-white/60 ">
      <div className="flex items-center justify-between mx-auto max-w-7xl px-4">
        <h2 className="text-lg text-zinc-800 font-semibold">
          {greeting}, {user?.fullname}!👋
        </h2>
        <div className="flex items-center gap-4">
          <div className="relative">
            <RiSearchLine className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input
              type="text"
              className="border border-gray-300 rounded pl-10 pr-4 py-1 focus:outline-none"
              placeholder="Search..."
            />
          </div>
          <div className="avatar avatar-placeholder">
            <div className="w-10 rounded-full bg-gray-300 text-gray-600 border-2 border-gray-300">
              {user?.avatar ? (
                <img
                  src={user?.avatar}
                  alt={user?.Fullname.split(" ")(0).charAt(0)}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  priority="high"
                />
              ) : (
                <span className="text-sm">
                  {user?.fullname
                    ?.split(" ")
                    .map((name) => name[0])
                    .join("")
                    .toUpperCase()}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
