import { createBrowserRouter, RouterProvider } from "react-router";
import { Children, lazy, Suspense } from "react";
import LazyLoader from "@/components/LazyLoader";
import { PublicRoutes, PrivateRoutes } from "./ProtectedRoutes";
import { useAuth } from "@/contextStore";

//render pages
const DashboardLayout = lazy(() => import("@/layouts/DashboardLayout"));
const ResetPassword = lazy(() => import("@/pages/account/ResetPassword"));
const PasswordReset = lazy(() => import("@/pages/account/PasswordReset"));
const SignUp = lazy(() => import("@/pages/account/SignUp"));
const OTP = lazy(() => import("@/pages/patientsOnboard/OTP"));
const OnboardingLayout = lazy(() => import("@/layouts/OnboardingLayout"));
const ContactLayout = lazy(() => import("@/layouts/ContactLayout"));
const RootLayout = lazy(() => import("@/layouts/RootLayout"));
const Home = lazy(() => import("@/pages/home/Home"));
const AuthLayout = lazy(() => import("@/layouts/AuthLayout"));
const ContactUs = lazy(() => import("@/pages/contact/ContactUs"));
const Login = lazy(() => import("@/pages/account/Login"));
const PatientsOnboard = lazy(() =>
  import("@/pages/patientsOnboard/PatientsOnboard")
);
const Dashboard = lazy(() => import("@/pages/sidebar/menu/Dashboard"));
const Appointments = lazy(() => import("@/pages/sidebar/menu/Appointments"));
const Rooms = lazy(() => import("@/pages/sidebar/menu/Rooms"));
const Payments = lazy(() => import("@/pages/sidebar/menu/Payments"));
const Doctors = lazy(() => import("@/pages/sidebar/management/Doctors"));
const Inpatients = lazy(() => import("@/pages/sidebar/management/Inpatients"));
const Patients = lazy(() => import("@/pages/sidebar/management/Patients"));
const Users = lazy(() => import("@/pages/sidebar/setting/Users"));
const Setting = lazy(() => import("@/pages/sidebar/setting/Setting"));

export default function AppRoutes() {
  const { accessToken, user } = useAuth();
  const routes = [
    {
      element: (
        <Suspense fallback={<LazyLoader />}>
          <PublicRoutes accessToken={accessToken}>
            <RootLayout />
          </PublicRoutes>
        </Suspense>
      ),
      children: [
        {
          index: true,
          element: (
            <Suspense fallback={<LazyLoader />}>
              <Home />
            </Suspense>
          ),
        },
      ],
    },
    {
      element: (
        <Suspense fallback={<LazyLoader />}>
          <ContactLayout />
        </Suspense>
      ),
      children: [
        {
          path: "/contact",
          element: (
            <Suspense fallback={<LazyLoader />}>
              <ContactUs />
            </Suspense>
          ),
        },
      ],
    },
    {
      path: "account",
      element: (
        <Suspense fallback={<LazyLoader />}>
          <PublicRoutes accessToken={accessToken}>
            <AuthLayout />
          </PublicRoutes>
        </Suspense>
      ),
      children: [
        {
          path: "signin",
          element: (
            <Suspense fallback={<LazyLoader />}>
              <Login />
            </Suspense>
          ),
        },
        {
          path: "signup",
          element: (
            <Suspense fallback={<LazyLoader />}>
              <SignUp />
            </Suspense>
          ),
        },

        {
          path: "password-reset",
          element: (
            <Suspense fallback={<LazyLoader />}>
              <PasswordReset />
            </Suspense>
          ),
        },
         {
          path: "reset-password",
          element: (
            <Suspense fallback={<LazyLoader />}>
              <ResetPassword />
            </Suspense>
          ),
        },
      ],
    },
    {
      element: (
        <PrivateRoutes accessToken={accessToken} user={user}>
          <Suspense fallback={<LazyLoader />}>
            <OnboardingLayout />
          </Suspense>
        </PrivateRoutes>
      ),
      children: [
        {
          path: "patients-onboard",
          element: (
            <Suspense fallback={<LazyLoader />}>
              <PatientsOnboard />
            </Suspense>
          ),
        },
        {
          path: "verify-account",
          element: (
            <Suspense fallback={<LazyLoader />}>
              <OTP />
            </Suspense>
          ),
        },
      ],
    },
    {
      element: (
        <PrivateRoutes accessToken={accessToken} user={user}>
          <Suspense fallback={<LazyLoader />}>
            <DashboardLayout />
          </Suspense>
        </PrivateRoutes>
      ),
      children: [
        {
          path: "dashboard",
          element: (
            <Suspense fallback={<LazyLoader />}>
              <Dashboard />
            </Suspense>
          ),
        },
        {
          path: "appointments",
          element: (
            <Suspense fallback={<LazyLoader />}>
              <Appointments />
            </Suspense>
          ),
        },
        {
          path: "rooms",
          element: (
            <Suspense fallback={<LazyLoader />}>
              <Rooms />
            </Suspense>
          ),
        },
        {
          path: "payments",
          element: (
            <Suspense fallback={<LazyLoader />}>
              <Payments />
            </Suspense>
          ),
        },
        {
          path: "doctors",
          element: (
            <Suspense fallback={<LazyLoader />}>
              <Doctors />
            </Suspense>
          ),
        },
        {
          path: "patients",
          element: (
            <Suspense fallback={<LazyLoader />}>
              <Patients />
            </Suspense>
          ),
        },
        {
          path: "Inpatients",
          element: (
            <Suspense fallback={<LazyLoader />}>
              <Inpatients />
            </Suspense>
          ),
        },
        {
          path: "users",
          element: (
            <Suspense fallback={<LazyLoader />}>
              <Users />
            </Suspense>
          ),
        },
        {
          path: "setting",
          element: (
            <Suspense fallback={<LazyLoader />}>
              <Setting />
            </Suspense>
          ),
        },
      ],
    },
  ];
  const router = createBrowserRouter(routes);
  return <RouterProvider router={router} />;
}
