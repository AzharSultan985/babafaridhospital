import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const [isAuth, setIsAuth] = useState(null); // null means "checking..."

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/staffindoorverify`, {
          credentials: "include", // send cookies with request
        });
        const data = await res.json();
        // console.log(data.loggedIn);
        
        setIsAuth(data.loggedIn);
      } catch (error) {
        // console.error("Auth check failed:", error);
        setIsAuth(false);
      }
    };

    checkLoggedIn();
  }, []);

  // Agar abhi check ho raha hai to kuch render mat karo
  if (isAuth === null) return null;

  return isAuth ? children : <Navigate to="/stafflogin" replace />;
}
