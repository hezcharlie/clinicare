import {
  RiBankCardLine,
  RiCalendarScheduleLine,
  RiDashboardLine,
  RiGroup3Line,
  RiGroupLine,
  RiHotelBedLine,
  RiSettingsLine,
  RiStethoscopeLine,
  RiUserLine,
} from "@remixicon/react";
import dayjs from "dayjs";

export const navLinks = [
  {
    title: "Menu",
    links: [
      { id: 1, label: "Dashboard", to: "/dashboard", icon: RiDashboardLine },
      {
        id: 2,
        label: "Appointments",
        to: "/appointments",
        icon: RiCalendarScheduleLine,
      },
      { id: 3, label: "Rooms", to: "/rooms", icon: RiHotelBedLine },
      { id: 4, label: "Payments", to: "payments", icon: RiBankCardLine },
    ],
  },
  {
    title: "Management",
    links: [
      { id: 5, label: "Doctors", to: "/doctors", icon: RiStethoscopeLine },
      { id: 6, label: "Patients", to: "/patients", icon: RiGroupLine },
      { id: 7, label: "Inpatients", to: "/inpatients", icon: RiGroup3Line },
    ],
  },
  {
    title: "Setting",
    links: [
      { id: 8, label: "Users", to: "/users", icon: RiUserLine },
      { id: 9, label: "Settings", to: "/setting", icon: RiSettingsLine },
    ],
  },
];

export const bloodGroup = {
  "A+": "A-positive",
  "A-": "A-negative",
  "B+": "B-positive",
  "B-": "B-negative",
  "AB+": "AB-positive",
  "AB-": "AB-negative",
  "O+": "O-positive",
  "O-": "O-negative",
};

export const headers = (accessToken) => {
  return {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
};

export const getTimeBasedGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 16) return "Good afternoon";
  return "Good evening";
};

export const formDate = (item, format = "display") => {
  if (format === "input") {
    return dayjs(item).format("YYYY-MM-DD");
  }
  return dayjs(item).format("DD/MM/YYYY");
};
