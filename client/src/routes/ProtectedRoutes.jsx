import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

export function PublicRoutes({ children, accessToken }) {
  const location = useLocation();
  const navigate = useNavigate();
  const from = location?.state?.from || "/dashboard"; //the dashboard would be our home page for our login user

  useEffect(() => {
    if (accessToken) {
      navigate(from, {
        state: { from: location },
        replace: true,
      });
    }
  }, [accessToken, from, location, navigate]);
  return children; //if this rule is successful, we want to return the children which is the pages
}

// u need to be authenticated to this page

export function PrivateRoutes({ children, accessToken, user }) {
  const location = useLocation();
  const navigate = useNavigate();
  const from = location?.state?.from || "/account/signin";
  useEffect(() => {
    if (!accessToken) {
      navigate(from, {
        state: { from: location },
        replace: true,
      });
    }
     if (user && !user.isVerified && location.pathname !== "/verify-account") {
      navigate("/verify-account");
     }
    //handle redirect to patient onboard page
    if (
      user &&
      user?.isVerified &&
      user?.role === "patient" &&
      !user?.isCompletedOnboard &&
      location.pathname !== "/patients-onboard"
    ) {
      navigate("/patients-onboard", {
        state: { from: location },
        replace: true,
      });
    }
  }, [accessToken, from, location, navigate, user]);

  return children;
}

export function VerifiedRoutes({ children, accessToken, user }) {
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.pathname?.from || "/account/signin";

  useEffect(() => {
    if (!accessToken) {
      navigate(from, {
        state: { from: location },
        replace: true,
      });
    }
    //handle redirect to verify account
    if (user && !user.isVerified && location.pathname !== "/verify-account") {
      navigate("/verify-account");
      //here we are saying if we have a user and is not verified take them to verify page
    }
  }, [accessToken, from, location, navigate, user]);
  return children;
}
