import api from "./axios.config";

export const updateProfile = (profileData) =>{
  return api.put("/auth/update-user", profileData);
}


export const checkAuthAPI = () => {
  return api.get("/auth/me");
};

export const getProfileAPI = () => {
  return api.get("/auth/profile");
}

export const logoutAPI = () => {
  return api.post("/auth/logout-user");
}

export const getDoctorListsAPI = () => {
  return api.get("/patients/doctors");
};

export const getDoctorAPI = (doctorId) => {
  return api.get(`/patients/doctors/${doctorId}`);
}

export const bookAppointmentAPI = (appointmentData) => {
  return api.post("/patients/appointments", appointmentData);
}

export const getAppointmentsAPI = () => {
  return api.get("/patients/appointments");
}

export const getAppointmentAPI = (appointmentId) => {
  return api.get(`/patients/appointments/${appointmentId}`);
}

export const cancelAppointmentAPI = (appointmentId) => {
  return api.patch(`/patients/appointments/${appointmentId}/cancel`);
}

export const doctorSignupAPI = (doctorData) => {
  return api.post("/auth/create-doctor", doctorData);
}

export const doctorAppointments = () => {
    return api.get("/doctors/appointments")
}

export const getAllMessagesAPI = (otherUserId) => {
  return api.get(`/chat/message/${otherUserId}`);
}

export const getUserDataApi = (id) => {
  return api.get(`/user/profile/${id}`);
} 