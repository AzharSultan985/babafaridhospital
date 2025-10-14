// context/LoginContext.js
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loggedinRes, setloggedinRes] = useState("");

  const navigate = useNavigate(); // ✅ React Router hook

const LoginIndoor = async () => {
  try {
    setLoading(true);

    // const baseUrl =
    //   process.env.REACT_APP_DEVELOP_PHASE === "development"
    //     ? process.env.REACT_APP_BACKEND_URL
    //     : "";
// alert(baseUrl);

    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/loginadmin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        username,
        password,
      }),
    });

      const data = await res.json();
      setloggedinRes(data.message);

      if (data.message === "Login successful") {
        navigate("/admindashboard"); // ✅ Correct way
      } else {
        throw new Error("Failed to log admin");
      }
    } catch (err) {
      //console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  // 🚀 Logout function
  const LogoutAdmin = async () => {
    try {
let res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/logout`, {
      method: "POST",
      credentials: "include",
    });

    let data = await res.json(); // ✅ parse response JSON
    //console.log("Logout response:", data);

    if (data.message === "Logged out") {
      setLoading(false)
      navigate("/login"); // ✅ Correct way
    } 
  }catch (err) {
      //console.error("Logout failed:", err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        setUsername,
        setPassword,
        LoginIndoor,
        setLoading,
        loggedinRes,
        loading,
        LogoutAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
