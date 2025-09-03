import { createBrowserRouter, RouterProvider } from "react-router";
import { lazy, Suspense } from "react";
import {LazyLoader} from "@/components/LazyLoader";
import { PublicRoutes, PrivateRoutes, VerifiedRoutes } from "./ProtectedRoutes";
import { useAuth } from "@/contextStore";
import ErrorBoundary from "@/components/ErrorBoundary";



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
const Dashboard = lazy(() => import("@/pages/sidebar/menu/dashboard/Dashboard"));
const Appointments = lazy(() => import("@/pages/sidebar/menu/appointments/Appointments"));
const Rooms = lazy(() => import("@/pages/sidebar/menu/rooms/Rooms"));
const Payments = lazy(() => import("@/pages/sidebar/menu/payments/Payments"));
const Doctors = lazy(() => import("@/pages/sidebar/management/doctors/Doctors"));
const Inpatients = lazy(() => import("@/pages/sidebar/management/inpatients/Inpatients"));
const Patients = lazy(() => import("@/pages/sidebar/management/patients/Patients"));
const Users = lazy(() => import("@/pages/sidebar/setting/users/Users"));
const Setting = lazy(() => import("@/pages/sidebar/setting/setting/Setting"));
const Account = lazy(() => import("@/pages/sidebar/setting/setting/account/Account"));
const Password = lazy(() => import("@/pages/sidebar/setting/setting/password/Password"));
const HealthRecord = lazy(() => import("@/pages/sidebar/setting/setting/healthRecord/HealthRecord"));
const PatientsAppointment = lazy(() => import("@/pages/sidebar/menu/appointments/PatientsAppointment"));
const PatientsPayment = lazy(() => import("@/pages/sidebar/menu/payments/PatientsPayment"));


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
      errorElement: <ErrorBoundary/>,
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
       errorElement: <ErrorBoundary/>,
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
       errorElement: <ErrorBoundary/>,
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
        <VerifiedRoutes accessToken={accessToken} user={user}>
          <Suspense fallback={<LazyLoader />}>
            <OnboardingLayout />
          </Suspense>
        </VerifiedRoutes>
      ),
       errorElement: <ErrorBoundary/>,
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
       path: "dashboard",
      element: (
        <PrivateRoutes accessToken={accessToken} user={user}>
          <Suspense fallback={<LazyLoader />}>
            <DashboardLayout />
          </Suspense>
        </PrivateRoutes>
      ),
       errorElement: <ErrorBoundary/>,
      children: [
        {
         index:true,
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
          path: "patient-appointments",
          element: (
            <Suspense fallback={<LazyLoader />}>
              <PatientsAppointment />
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
          path: "patient-payments",
          element: (
            <Suspense fallback={<LazyLoader />}>
              <PatientsPayment />
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
          path: "settings",
          element: (
            <Suspense fallback={<LazyLoader />}>
              <Setting />
            </Suspense>
          ),
          children: [
           {
             path: "account",
            element: (
              <Suspense fallback={<LazyLoader />}>
                <Account/>
              </Suspense>
            ),
           },
            {
             path: "password",
            element: (
              <Suspense fallback={<LazyLoader />}>
                <Password/>
              </Suspense>
            ),
           },
            {
             path: "health",
            element: (
              <Suspense fallback={<LazyLoader />}>
                <HealthRecord/>
              </Suspense>
            ),
           },
          ],
        },
      ],
    },
  ];
  const router = createBrowserRouter(routes);
  return <RouterProvider router={router} />;
}
