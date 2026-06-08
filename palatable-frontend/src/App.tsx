/* import { useState } from 'react' */
import "./assets/css/index.css";
import HeaderSection from "./components/header";
import FooterSection from "./components/footer";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import ProfilePage from "./pages/profilePage";
import LoginPage from "./pages/loginPage";
import SignupPage from "./pages/signupPage";
import MainPage from "./pages/mainPage";

function App() {
  return (
    <>
    <Router>
      <HeaderSection />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Routes>
      <FooterSection />
      </Router>
    </>
  );
}

export default App;
