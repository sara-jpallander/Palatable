/* import { useState } from 'react' */
import './assets/css/index.css'
import HeaderSection from './components/header'

function App() {

  return ( 
    <>
    <HeaderSection />
    <main>
      <div className="SiteContainer siteGrid">
          <h1 className='sitegrid-halfWidth--left'>Welcome</h1>
          <p className="FrontPage-slogan sitegrid-halfWidth--left">Let us set the tone.</p>

          <section className='FrontPage-intro sitegrid-halfWidth--left'>
            <h2>pal · at · a · ble</h2>
            <p>
              Meaning acceptable and pleasing to the taste and mind. <br/>  
              Here at Palatable we strive to set the palette for your projects with good aesthetics in mind, 
              without compromising on accessibility.
            </p>
            <button>
              How it works <span>🡢</span>
            </button>
          </section>
      </div>
    </main>
    </>
  )
}

export default App
