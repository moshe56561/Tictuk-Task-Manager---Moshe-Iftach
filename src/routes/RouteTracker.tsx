import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { logPageVisit, getPageNameFromPath } from "../utils/analytics";

const RouteTracker = () => {
  const location = useLocation();

  useEffect(() => {
    const pageName = getPageNameFromPath(location.pathname);
    logPageVisit(pageName);
  }, [location.pathname]);

  return null; // This component doesn't render anything
};

export default RouteTracker;
