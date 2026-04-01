import api from "./axios.config";

// AUTH

export const registerAPI = (data) => {
  return api.post("/auth/register", data);
};

export const loginAPI = (data) => {
  return api.post("/auth/login", data);
};

export const logoutAPI = () => {
  return api.post("/auth/logout");
};

export const checkAuthAPI = () => {
  return api.get("/auth/me");
};

// USER

export const updateProfile = (profileData) => {
  return api.patch("/users/me", profileData);
};

export const getUserDataApi = (id) => {
  return api.get(`/users/${id}`);
};

// PATIENT

export const getProfileAPI = () => {
  return api.get("/users/me");
};

export const getDoctorListsAPI = () => {
  return api.get("/doctors");
};

export const getDoctorAPI = (doctorId) => {
  return api.get(`/doctors/${doctorId}`);
};

export const bookAppointmentAPI = (data) => {
  return api.post("/patients/appointments", data);
};

export const getAppointmentsAPI = () => {
  return api.get("/patients/appointments");
};

export const getAppointmentAPI = (id) => {
  return api.get(`/patients/appointments/${id}`);
};

export const cancelAppointmentAPI = (id) => {
  return api.patch(`/patients/appointments/${id}/cancel`);
};

export const confirmAppointmentAPI = (id) => {
  return api.patch(`/patients/appointments/${id}/confirm`);
};

// Doctor

export const doctorAppointments = () => {
  return api.get("/doctors/appointments");
};

export const doctorSignupAPI = (doctorData) => {
  return api.post("/register/doctor", doctorData);
}

// Chat

export const getUserlistAPI = () => {
  return api.get("/chats");
};

export const getAllMessagesAPI = (userId) => {
  return api.get(`/chats/${userId}/messages`);
};

// Transaction

export const getTransactionLists = () => {
  return api.get("/transactions");
};

export const addedAmount = (data) => {
  return api.post("/transactions/wallet/topup", data);
};