import { createContext, useEffect, useState } from "react";
import "./App.css";
import { useNavigate } from "react-router-dom";
import instance from "./Api/Axios.js";
import AppRouter from "./routes/App.routes.jsx";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop.jsx";

export const UserState = createContext();

function App() {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true); // Prevents UI "flicker"
  const navigate = useNavigate();

  const getUserData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return navigate("/auth");
      }

      const { data } = await instance.get("/auth/check");
      setUser(data);
    } catch (error) {
      console.log("Auth error:", error);
      navigate("/auth");
    } finally {
      setLoading(false); // Stop loading regardless of success/fail
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "100px",
        }}
      >
        <h3>Loading...</h3>
      </div>
    );
  }

  return (
    <UserState.Provider value={{ user, setUser }}>
      <ScrollToTop />
      <AppRouter />
    </UserState.Provider>
  );
}

export default App;
