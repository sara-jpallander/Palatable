/* import { useState } from 'react' */
import "./assets/css/index.css";
import HeaderSection from "./components/header";
import FooterSection from "./components/footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProfilePage from "./pages/profilePage";
import MainPage from "./pages/mainPage";

function App() {
  return (
    <>
      <HeaderSection />
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Routes>
      </Router>
      <FooterSection />
    </>
  );
}

export default App;
