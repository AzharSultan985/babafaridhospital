import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export default function PharmacyProtectedRoute({ children }) {
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const res = await fetch("http://localhost:3002/api/pharmacycheckAuth", {
          credentials: "include", // send cookies
        });
        const data = await res.json();
        setIsAuth(data.loggedIn);
      } catch (error) {
        setIsAuth(false);
      }
    };

    checkLoggedIn();
  }, []);

  if (isAuth === null) return null; // abhi check ho raha hai

  return isAuth ? children : <Navigate to="/pharmalogin" replace />;
}
