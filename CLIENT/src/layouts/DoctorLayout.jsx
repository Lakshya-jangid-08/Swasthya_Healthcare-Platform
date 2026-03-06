import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import DoctorHeader from "../components/DoctorHeader";

const DoctorLayout = () => {
  return (
    <>
      <DoctorHeader />
      <Outlet />
      <Footer />
    </>
  );
};

export default DoctorLayout;
