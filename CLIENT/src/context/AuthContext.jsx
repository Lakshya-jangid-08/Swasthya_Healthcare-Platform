import { createContext, useContext, useEffect, useState } from "react";
import { checkAuthAPI, getDoctorListsAPI, getProfileAPI, logoutAPI } from "../service/apis";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [allDoctors, setAllDoctors] = useState([]);

  const checkAuth = async () => {
    try {
      const res = await checkAuthAPI();
      
      setUser(res.data.user);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const getProfile = async () => {
    try {
      const res = await getProfileAPI();
      setUser({
      ...res.data.user,
        roleData: res.data.roleData,
      });
    } catch (error) {
      console.error("Error fetching profile:", error);
      setUser(null);
    }
  };

  const logout = async () => {
    setIsLoggingOut(true);
    try {
      await logoutAPI();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setUser(null);
      setIsLoggingOut(false);
    }
  };

   const getDoctors = async() => {
      const response = await getDoctorListsAPI();
      setAllDoctors(response.data.doctorList);
   }

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading, checkAuth, logout, isLoggingOut, getProfile, allDoctors, getDoctors }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
