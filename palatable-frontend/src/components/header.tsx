import '../assets/css/index.css'
import logo from '../assets/images/logo.svg'
import { useNavigate } from 'react-router'

function HeaderSection() {

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
            <button onClick={navigateToLogin} className="HeaderButton--login">Login</button>
            <button onClick={navigateToSignup} className="HeaderButton--register">Register</button>
          </div>
      </div>
    </header>
  )
}

export default HeaderSection
