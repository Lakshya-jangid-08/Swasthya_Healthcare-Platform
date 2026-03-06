import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

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
