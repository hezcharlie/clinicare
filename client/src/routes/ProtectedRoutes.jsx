import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

export function PublicRoutes({ children, accessToken }) {
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || "/dashboard";
  //this helps to save and take users back to their previous pages each time they click on return

  useEffect(() => {
    if (accessToken) {
      navigate(from, {
        state: { from: location },
        replace: true,
      });
    }
  }, [accessToken, from, location, navigate]);
  return children;
}

export function PrivateRoutes({ children, accessToken, user }) {
  //this check to see if a user is a registered user before allowing the user to access registered users pages, if not it will take the user to the signin page
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || "/account/signin";

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
    }
    if (
      user &&
      user.isVerified &&
      user.role === "patient" &&
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
