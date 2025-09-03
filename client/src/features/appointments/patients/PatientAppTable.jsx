import {
  appointmentsStatusColors,
  formatDate,
  patientsAppointmentsTableColumns,
} from "@/utils/constants";
import React, { useCallback } from "react";
import TableBody from "@/components/TableBody";
import Edit from "./Edit";
import Note from "./Edit";

export default function Table({ patientsAppointment }) {
  const renderCell = useCallback((appointment, columnKey) => {
    const cellValue = appointment[columnKey];
    switch (columnKey) {
      case "appointmentId":
        return (
          <>
            <h1 className="">{appointment?._id}</h1>
          </>
        );
      case "appointmentDate":
        return (
          <div className="capitalize">
            {formatDate(appointment?.appointmentDate)}
          </div>
        );
      case "doctor":
        return (
          //   <div className="capitalize">{appointment?.doctor?.fullname}</div>
          <div className="capitalize font-semibold">
            {appointment?.doctorId?.fullname
              ? `Dr. ${appointment?.doctorId?.fullname}`
              : "Not Assigned"}
          </div>
        );
      case "appointmentTime":
        return <div className="capitalize">{appointment?.appointmentTime}</div>;
      case "status":
        return (
          <div
            className={`capitalize badge badge-sm font-bold ${
              appointmentsStatusColors[appointment?.status]
            }`}
          >
            {appointment?.status}
          </div>
        );
      case "action":
        return (
          <div className="flex gap-4 items-center">
            <Note appointment={appointment} />
            <Edit appointment={appointment} />
          </div>
        );
      default:
        return cellValue;
    }
  }, []);
  return (
    <>
      <TableBody
        tableColumns={patientsAppointmentsTableColumns}
        tableData={patientsAppointment}
        renderCell={renderCell}
      />
    </>
  );
}