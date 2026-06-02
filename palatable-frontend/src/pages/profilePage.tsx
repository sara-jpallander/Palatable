import { useAuthStore } from "../store/authStore";
import LoginForm from "../components/Forms/loginForm";
import SignupForm from "../components/Forms/signupForm";

const profilePage = () => {

  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);

  const handleLogout = () => {
    logout();
  }

  return (
    <>
    {user ? (<div>
      <button onClick={handleLogout}>Logout</button>
      <p>{user.name}</p>
      </div>
      ) : 
      <>
      <LoginForm />
      <SignupForm />
      </>
    }
      
      
    </>
  );
};

export default profilePage;
