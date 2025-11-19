import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export default function RecepUserProtectedRoute({ children }) {
  const [isAuth, setIsAuth] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/recep-user-verify`, {
          credentials: "include", // Important for cookies
        });
        
        const data = await res.json();
        console.log("Auth check:", data);
        
        setIsAuth(data.loggedIn);
      } catch (error) {
        console.error("Auth check failed:", error);
        setIsAuth(false);
      } finally {
        setLoading(false);
      }
    };

    checkLoggedIn();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return isAuth ? children : <Navigate to="/recep-login" replace />;
}