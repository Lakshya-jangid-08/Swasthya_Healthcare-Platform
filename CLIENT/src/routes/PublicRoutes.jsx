import { Route } from "react-router-dom";
import PublicLayout from "../layouts/PublicLayout";
import Login from "../features/Auth/Pages/Login";
import Signup from "../features/Auth/Pages/Signup";
import Home from "../features/Shared/Pages/Home";
import DocotrLists from "../features/Shared/Pages/DocotrLists";
import About from "../features/Shared/Pages/About";
import Contact from "../features/Shared/Pages/Contact";


const PublicRoutes = () => {
  return (
    <>
      <Route element={<PublicLayout/>}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/doctors" element={<DocotrLists />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Route>
    </>
  );
};

export default PublicRoutes;
