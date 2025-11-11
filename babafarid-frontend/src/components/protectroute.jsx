import { useEffect, useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/LoginContext";


export default function ProtectedRoute({ children }) {
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoadingState] = useState(true); // local loading
  const { setLoading } = useContext(AuthContext);

  useEffect(() => {
    const checkLoggedIn = async () => {
      setLoading(true); // global loading start
      setLoadingState(true); // local loading start

      try {
        // alert(import.meta.env.backend_Fetch_URl);
        
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/checkAuth`, {
          credentials: "include",
        });
        const data = await res.json();
        setIsAuth(data.loggedIn);
      } catch (error) {
        //console.error("Auth check failed:", error);
        setIsAuth(false);
      }

      setLoading(false); // global loading end
      setLoadingState(false); // local loading end
    };

    checkLoggedIn();
  }, [setLoading]);

  // While checking authentication, don't render anything yet
  if (loading) return null;

  return isAuth ? children : <Navigate to="/login" replace />;
}
