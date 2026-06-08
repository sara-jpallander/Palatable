import '../assets/css/index.css'
import logo from '../assets/images/logo.svg'
import hamburger from '../assets/images/hamburger.svg'
import close from '../assets/images/close.svg'
import profile from '../assets/images/profile.svg'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import { useAuthStore } from '../store/authStore';
function HeaderSection() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  }
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
    setIsMenuOpen(false);
    navigate('/');
  }
  const navigateToLogin = () => {
    setIsMenuOpen(false);
    navigate('/login');
  }
  const navigateToSignup = () => {
    setIsMenuOpen(false);
    navigate('/signup');
  }
  const navigateToProfile = () => {
    setIsProfileMenuOpen(false);
    setIsMenuOpen(false);
    navigate('/profile');
  }
  const handleLogout = () => {
    setIsProfileMenuOpen(false);
    setIsMenuOpen(false);
    logout();
    navigate('/');
  }
  return (
    <header>
      <div className="HeaderContainer flex-SpaceBetween">
        {/* Logo */}
        <img onClick={navigateToHome} src={logo} className="HeaderContainer-logo" style={{cursor: 'pointer'}} alt="Logo" />
        {/* Desktop navigation */}
        <div className="HeaderContainer-buttons u-hiddenMobile">
          {user ? (
            <div className="HeaderProfileMenu" ref={profileMenuRef}>
              <button
                type="button"
                className="HeaderProfileMenu-trigger"
                onClick={() => setIsProfileMenuOpen((open) => !open)}
              >
                <img src={profile} alt="Profile" className="HeaderContainer-profile" />
              </button>
              {isProfileMenuOpen && (
                <div className="HeaderProfileMenu-dropdown">
                  <button type="button" onClick={navigateToProfile}>Profile</button>
                  <button type="button" onClick={handleLogout}>Log out</button>
                </div>
              )}
            </div>
          ) : (
            <>
              <button onClick={navigateToLogin} className="HeaderButton--login">Login</button>
              <button onClick={navigateToSignup} className="HeaderButton--register">Register</button>
            </>
          )}
        </div>
        {/* Hamburger Button (Bara mobil ) */}
        <img 
          src={isMenuOpen ? close : hamburger} 
          alt="Menu" 
          className='u-hiddenDesktop MenuBtn' 
          onClick={toggleMenu}
        />
        {/* Mobil meny overlay*/}
        <div className={`HeaderContainer-buttons MobileMenu u-hiddenDesktop ${isMenuOpen ? 'is-active' : ''}`}>
          <img onClick={navigateToHome} src={logo} className="HeaderContainer-logo" alt="Logo" />
          
          {user ? (
            <div className="MobileMenu-userActions">
              <p style={{margin: '1rem 0'}}>Välkommen, {user.name}!</p>
              <button onClick={navigateToProfile} className="HeaderButton--login">Min Profil</button>
              <button onClick={handleLogout} className="HeaderButton--register">Logga ut</button>
            </div>
          ) : (
            <>
              <button onClick={navigateToLogin} className="HeaderButton--login">Login</button>
              <button onClick={navigateToSignup} className="HeaderButton--register">Register</button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
export default HeaderSection;