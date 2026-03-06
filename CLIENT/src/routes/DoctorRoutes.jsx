import { Route } from "react-router-dom";
import ProtectedRoute from  "../routes/ProtectedRoute";
import DoctorLayout from "../layouts/DoctorLayout";
import DoctorProfile from "../features/Doctors/Pages/DoctorProfile";
import DoctorEditProfile from "../features/Doctors/Pages/DoctorEditProfile";
import DoctorChat from "../features/Doctors/Pages/DoctorChat";
import DocotrPaymentStatus from "../features/Doctors/Pages/DocotrPaymentStatus";
import DoctorReviews from "../features/Doctors/Pages/DoctorReviews";
import DoctorAppointment from "../features/Doctors/Pages/DoctorAppointment";

const DoctorRoutes = () => {
  return (
    <Route element={<ProtectedRoute allowedRoles={["doctor"]} />}>
      <Route element = {<DoctorLayout/>}>
        <Route path="/doctor/profile" element={<DoctorProfile />} />
        <Route path="/doctor/edit-profile" element={<DoctorEditProfile />} />
        <Route path="/doctor/chat" element={<DoctorChat />} />
        <Route path="/doctor/chat/:id" element={<DoctorChat />} />
        {/* <Route path="/doctor/analytics" element={<doct />} /> not confirmed. */}
        <Route path="/doctor/payments-status" element={<DocotrPaymentStatus />} />
        <Route path="/doctor/reviews" element={<DoctorReviews />} />
        <Route path="/doctor/appointments" element={<DoctorAppointment />} />
      </Route>
    </Route>
  );
};

export default DoctorRoutes;
