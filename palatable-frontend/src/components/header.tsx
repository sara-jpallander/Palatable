import '../assets/css/index.css'
import logo from '../assets/images/logo.svg'
import hamburger from '../assets/images/hamburger.svg'
import close from '../assets/images/close.svg'
import { useState } from "react";

function HeaderSection() {
  const [isMenuOpen, setIsMoneuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMoneuOpen(!isMenuOpen);
  }

  return (
    <header>
      <div className="HeaderContainer flex-SpaceBetween">
          <img src={logo} className="HeaderContainer-logo"/>
          <div className="HeaderContainer-buttons u-hiddenMobile">
            <button className="HeaderButton--login">Login</button>
            <button className="HeaderButton--register">Register</button>
          </div>
          <img src={isMenuOpen ? close : hamburger} 
               alt="Hamburger Menu" 
               className='u-hiddenDesktop MenuBtn' 
               onClick={toggleMenu}
               />
          <div 
          className={
            `HeaderContainer-buttons 
            MobileMenu 
            u-hiddenDesktop 
            ${isMenuOpen && 'is-active'}`
          }>
            <button className="HeaderButton--login">Login</button>
            <button className="HeaderButton--register">Register</button>
          </div>
      </div>
    </header>
  )
}

export default HeaderSection
