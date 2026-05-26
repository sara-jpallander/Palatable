import '../assets/css/index.css'
import logo from '../assets/images/logo.svg'

function HeaderSection() {

  return (
    <header>
      <div className="HeaderContainer flex-SpaceBetween">
          <img src={logo} className="HeaderContainer-logo"/>
          <div className="HeaderContainer-buttons">
            <button className="HeaderButton--login">Login</button>
            <button className="HeaderButton--register">Register</button>
          </div>
      </div>
    </header>
  )
}

export default HeaderSection
