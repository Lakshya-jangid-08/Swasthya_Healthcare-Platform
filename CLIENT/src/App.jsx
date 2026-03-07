import React from "react";
import { Routes } from "react-router-dom";
import PublicRoutes from "./routes/PublicRoutes";
import PatientRoutes from "./routes/PatientRoutes";
import DoctorRoutes from "./routes/DoctorRoutes";
import { useAuth } from "./context/AuthContext";

function App() {
  const { loading } = useAuth();

  // Handle loading OUTSIDE Routes
  if (loading) return <div>Loading...</div>;

  return (
    <>
      <Routes>
        {PublicRoutes()}
        {PatientRoutes()}
        {DoctorRoutes()}
      </Routes>
    </>
  );
}

export default App;
