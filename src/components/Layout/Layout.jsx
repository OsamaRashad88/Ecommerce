import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

export default function Layout({ userData, setuserData }) {
  let navigate = useNavigate();
  function logout() {
    localStorage.removeItem("userToken");
    setuserData(null);
    navigate("/login");
  }

  return (
    <div>
      <Navbar userData={userData} logout={logout}></Navbar>
      <Outlet></Outlet>
    </div>
  );
}
