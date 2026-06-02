import '../assets/css/index.css'
import logo from '../assets/images/logo.svg'
import { useNavigate } from 'react-router'
import { useAuthStore } from '../store/authStore';

function HeaderSection() {

  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
  }

  const navigate = useNavigate();

  const navigateToHome = () => {
    navigate('/')
  }

  const navigateToLogin = () => {
    navigate('/login')
  }
  const navigateToSignup = () => {
    navigate('/signup')
  }

  return (
    <header>
      <div className="HeaderContainer flex-SpaceBetween">
          <img onClick={navigateToHome} src={logo} className="HeaderContainer-logo"/>
          <div className="HeaderContainer-buttons">
            {user ? 
            (
              <>
              <h2>Hej {user.name}!</h2>
              <button onClick={handleLogout}>Logga ut</button>
              </>
            ): 
            <>
            <button onClick={navigateToLogin} className="HeaderButton--login">Login</button>
            <button onClick={navigateToSignup} className="HeaderButton--register">Register</button>
            </>
            }
          </div>
      </div>
    </header>
  )
}

export default HeaderSection
