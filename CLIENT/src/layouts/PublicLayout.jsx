import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const PublicLayout = () => {

    const location = useLocation

    const hideLayout = 
    location.pathname == '/login' ||
    location.pathname == '/signup';

  return (
    <>
        {!hideLayout && <Header/>}
        <Outlet/>
        <Footer/>
    </>
  )
};

export default PublicLayout;
