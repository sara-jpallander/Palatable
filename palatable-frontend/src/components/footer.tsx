import '../assets/css/index.css'
import logoMini from '../assets/images/logo_mini.svg'

function FooterSection() {

  return (
    <footer>
      <div className="FooterContainer">
          <img src={logoMini} className="FooterContainer-logo"/>
      </div>
    </footer>
  )
}

export default FooterSection
