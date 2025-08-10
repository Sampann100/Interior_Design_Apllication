import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

const RequireAuth = ({ children }) => {
  const isLoggedIn = useSelector((state) => state.userData.success);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (!isLoggedIn && !showToast) {
      setShowToast(true);
    }
  }, [showToast]);

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RequireAuth;
