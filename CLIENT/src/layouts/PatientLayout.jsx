import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const PatientLayout = () => {
  const location = useLocation();
  location.pathname == '*/inbox/*';
  return (
    <>
     {!location && <Header/>} 
      <Outlet />
      {!location && <Footer />}  
    </>
  );
};

export default PatientLayout;
