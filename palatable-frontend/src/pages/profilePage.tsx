import { useState } from "react";
import LoginForm from "../components/Forms/loginForm";
import SignupForm from "../components/Forms/signupForm";

const profilePage = () => {
  return (
    <>
      <LoginForm />
      <SignupForm />
    </>
  );
};

export default profilePage;
