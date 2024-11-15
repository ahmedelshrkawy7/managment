import { Outlet, json } from "react-router-dom";
import React, { useEffect, useState, useContext, createContext } from "react";
import Sidebar from "./dashBoard/includes/sideBar/Sidebar";
import Navbar from "./dashBoard/includes/navBar/Navbar";
import Loader from "./dashBoard/components/loader/Loader";
import { useLocation, useNavigate } from "react-router-dom";
import AuthContext from "./dashBoard/Auth/AuthProvider";
import Sm_sidebar from "./dashBoard/includes/Sm_sidebar/Sm_sidebar";
import LoadContext from "./dashBoard/components/loader/LoaderContext";
import Nsidebar from "./dashBoard/includes/sideBar/Nsidebar";
import "./App.css";

export const serverApi = createContext(null);

const App = () => {
  const { Auth } = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState(JSON.parse(localStorage.getItem("token")));
  const [side, setSide] = useState(true);
  const location = useLocation();
  const { loader, setLoader } = useContext(LoadContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!Auth) {
      // navigate("login");
      console.log("first Auth");
    }

    console.log(JSON.parse(localStorage.getItem("Roles")) === "admin");

    if (JSON.parse(localStorage.getItem("Roles")) === "employee") {
      navigate("/Tasks List");
    }
  }, []);

  const toggleSide = () => {
    setSide(!side);
    return side;
  };

  return (
    <div className="all">
      {loader && <Loader />}
      <Nsidebar toggle={toggleSide} side={side} />
      <Sm_sidebar toggle={toggleSide} side={side} />
      <div className="main">
        <Navbar />
        <div className="body1">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default App;
