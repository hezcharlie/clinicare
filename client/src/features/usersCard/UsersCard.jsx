import { RiPhoneLine } from "@remixicon/react";
import { usersRoleColors } from "@/utils/constants";
import { formatDate } from "@/utils/constants";
import { useAuth } from "@/contextStore";
import EditUser from "./EditUser";
import DeleteUser from "./DeleteUser";

export default function UsersCard({ item }) {
  const { user } = useAuth();

  return (
    <div className="shadow rounded-xl bg-white p-2">
      <div className=" flex  gap-2">
        <div>
          <div className="avatar avatar-placeholder">
            <div className="w-10 rounded-full bg-gray-300 text-gray-600 border-2 border-gray-300">
              {item?.avatar ? (
                <img
                  src={item?.avatar}
                  alt={item?.fullname.split(" ")[0].charAt(0)}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  priority="high"
                />
              ) : (
                <span className="text-sm">
                  {item?.fullname
                    ?.split(" ")
                    .map((name) => name[0])
                    .join("")
                    .toUpperCase()}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="space-y-1">
          <p className="text-l font-bold">{item.fullname}</p>
          <p className="text-sm text-gray-500">{item.email}</p>

          <div
            className={`capitalize badge badge-sm font-semibold my-2 ${
              usersRoleColors[item.role]
            }`}
          >
            {item.role}
          </div>
          <p className="flex text-sm items-center text-gray-500">
            <RiPhoneLine size={15} className="" /> {item.phone}
          </p>
          <p className=" text-sm text-gray-500">
            Joined: {formatDate(item.joined)}
          </p>
        </div>
      </div>
      {user?.role === "admin" && (
        <div className="flex gap-2 justify-end pt-3">
         <EditUser  item={item}/>
         <DeleteUser item={item}/>
         
        </div>
      )}
    </div>
  );
}
 