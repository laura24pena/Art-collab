// src/routes/routes.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "../components/navbar.jsx";
import Footer from "../components/footer.jsx";

import Homepage from "../pages/homepage.jsx";
import About from "../pages/about.jsx";
import Login from "../pages/login.jsx";
import SignUp from "../pages/SignUp.jsx";
import ForgotPassword from "../pages/forgotPassword.jsx";
import ResetPassword from "../pages/resetPassword.jsx";

function AppRouter() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<About />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default AppRouter;
