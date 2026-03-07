import React from "react";
import { Route } from "react-router-dom";
import ProtectedRoute from "../routes/ProtectedRoute";
import PatientProfile from "../features/Patients/Pages/PatientProfile";
import PatientAppointment from "../features/Patients/Pages/PatientAppointments";
import PatientBookAppointment from "../features/Patients/Pages/PatientBookAppointment";
import PatientChat from "../features/Patients/Pages/PatientChat";
import PatientAnalytics from "../features/Patients/Pages/PatientAnalytics";
import PatientEditProfile from "../features/Patients/Pages/PatientEditProfile";
import PatientLayout from "../layouts/PatientLayout";

const PatientRoutes = () => {
  return (
    <Route element={<ProtectedRoute allowedRoles={["patient"]} />}>
      <Route element={<PatientLayout/>} >
        <Route path="/patient/profile" element={<PatientProfile />} />
        <Route path="/patient/appointments" element={<PatientAppointment />} />
        <Route path="/book-appointment/:id" element={<PatientBookAppointment />} />
        <Route path="/patient/inbox" element={<PatientChat />} />
        <Route path="/patient/inbox/:id" element={<PatientChat />} />
        <Route path="/patient/analytics" element={<PatientAnalytics />} />
        <Route path="/patient/edit-profile" element={<PatientEditProfile />} />
      </Route> 
    </Route>
  );
};

export default PatientRoutes;
