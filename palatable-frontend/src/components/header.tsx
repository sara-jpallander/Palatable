import '../assets/css/index.css'
import logo from '../assets/images/logo.svg'
import hamburger from '../assets/images/hamburger.svg'
import close from '../assets/images/close.svg'
import profile from '../assets/images/profile.svg'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import { useAuthStore } from '../store/authStore';

function HeaderSection() {
  const [isMenuOpen, setIsMoneuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMoneuOpen(!isMenuOpen);
  }

  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isProfileMenuOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setIsProfileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isProfileMenuOpen]);

  const navigateToHome = () => {
    navigate('/')
  }

  const navigateToLogin = () => {
    navigate('/login')
  }
  const navigateToSignup = () => {
    navigate('/signup')
  }

  const navigateToProfile = () => {
    setIsProfileMenuOpen(false);
    navigate('/profile')
  }

  const handleLogout = () => {
    setIsProfileMenuOpen(false);
    logout();
    navigate('/');
  }

  return (
    <header>
      <div className="HeaderContainer flex-SpaceBetween">
          <img onClick={navigateToHome} src={logo} className="HeaderContainer-logo"/>
          <div className="HeaderContainer-buttons">
            {user ? 
            (
              <div className="HeaderProfileMenu" ref={profileMenuRef}>
                <button
                  type="button"
                  className="HeaderProfileMenu-trigger"
                  onClick={() => setIsProfileMenuOpen((open) => !open)}
                  aria-expanded={isProfileMenuOpen}
                  aria-haspopup="true"
                >
                  <img
                    src={profile}
                    alt="Profile"
                    className="HeaderContainer-profile"
                  />
                </button>
                {isProfileMenuOpen && (
                  <div className="HeaderProfileMenu-dropdown">
                    <button type="button" onClick={navigateToProfile}>Profile</button>
                    <button type="button" onClick={handleLogout}>Log out</button>
                  </div>
                )}
              </div>
            ):
            <>
            <div className="HeaderContainer-buttons u-hiddenMobile">
              <button onClick={navigateToLogin} className="HeaderButton--login">Login</button>
              <button onClick={navigateToSignup} className="HeaderButton--register">Register</button>
            </div> 
            
            <div 
              className={
                `HeaderContainer-buttons 
                MobileMenu 
                u-hiddenDesktop 
                ${isMenuOpen && 'is-active'}`
              }>
            <button onClick={navigateToLogin} className="HeaderButton--login">Login</button>
            <button onClick={navigateToSignup} className="HeaderButton--register">Register</button>
            </div>
            </>
            }
          </div>
          <img src={isMenuOpen ? close : hamburger} 
               alt="Hamburger Menu" 
               className='u-hiddenDesktop MenuBtn' 
               onClick={toggleMenu}
          />
          
      </div>
    </header>
  
  )
}

export default HeaderSection