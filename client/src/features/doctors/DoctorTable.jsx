import { useCallback } from "react";
import { doctorsTableColumns, doctorsStatusColors } from "@/utils/constants";
import TableBody from "@/components/TableBody";
import { RiMailFill, RiPhoneLine } from "@remixicon/react";
import EditDoctor from "./EditDoctor";

export default function DoctorTable({ doctors }) {
  const renderCell = useCallback((doctor, columnKey) => {
    const cellValue = doctor[columnKey];
    switch (columnKey) {
      case "fullname":
        return (
          <>
            <h1 className="font-bold">{doctor?.userId?.fullname}</h1>
            {doctor?.userId?.email}
          </>
        );
      case "phone":
        return <div className="capitalize">{doctor?.phone ? doctor.phone : "N/A"}</div>;
      case "specialization":
        return (
          <div className="capitalize">{doctor?.specialization}</div>
        );
         case "availability":
        return (
          <div className={`capitalize badge badge-sm font-bold ${doctorsStatusColors[doctor?.availability]}`}>
            {doctor?.availability}
          </div>
        );
      case "action":
        return (
          <div className="">
          <EditDoctor doctor={doctor}/>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);
  return (
    <>
      <TableBody
        tableColumns={doctorsTableColumns}
        tableData={doctors}
        renderCell={renderCell}
      />
    </>
  );
}
