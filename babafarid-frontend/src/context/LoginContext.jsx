// context/LoginContext.js (or AuthContext.js)
import { createContext, useState } from "react";

export const AuthContext = createContext();

 export const AuthProvider = ({ children }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
const [loggedinRes,setloggedinRes]=useState()
   const LoginIndoor = async () => {
    try {
      const res = await fetch("http://localhost:3002/api/loginadmin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password
        }),  credentials: "include" 
      });
      const data = await res.json();
// alert(data.message)
setloggedinRes(data.message)
        if (data.message === "Login successful") {
        window.location.href = "/admindashboard"; 
      } else {
        throw new Error("Failed to logged admin");
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };
 // 🚀 New logout function
  const LogoutAdmin = async () => {
    try {
      await fetch("http://localhost:3002/api/logout", {
        method: "POST",
        credentials: "include"
      });
      setloggedinRes(""); // clear login state
      window.location.href = "/login";
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <AuthContext.Provider value={{ setUsername, setPassword,LoginIndoor,setLoading,loggedinRes,loading,LogoutAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

