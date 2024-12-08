import React, { useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { ACCESS_TOKEN } from "../../utils/constants";
import {
  ROUTE_LOGIN,
  ROUTE_NOT_AUTHORIZED,
  ROUTE_SIGNIN,
} from "../../utils/routes";

interface RoleBasedRouteProps {
  allowedRoles: string[];
  children: React.ReactNode;
}

const RoleBasedRoute: React.FC<RoleBasedRouteProps> = ({
  allowedRoles,
  children,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const user = useSelector((state: RootState) => state.auth.user);
  const accessToken = localStorage.getItem(ACCESS_TOKEN);

  useEffect(() => {
    if (!accessToken) {
      // Redirect to sign-in if no token is found
      navigate(ROUTE_SIGNIN);
    }
  }, [accessToken, navigate]);

  if (!user) {
    // Redirect to login if no user is authenticated
    return <Navigate to={ROUTE_LOGIN} state={{ from: location }} />;
  }

  if (!allowedRoles.includes(user.role)) {
    // Redirect to not authorized if the user's role is not permitted
    return <Navigate to={ROUTE_NOT_AUTHORIZED} />;
  }

  return <>{children}</>;
};

export default RoleBasedRoute;
