import React from 'react'
import arrow from '../assets/images/arrow-right.svg'
import PaletteCard from "../components/card-palette"
import { useEffect } from "react";

const mainPage = () => {
    useEffect(() => {
      const slider = document.querySelector('.CardPalette-slider') as HTMLElement | null;
      if (!slider) return;

      let isDown = false;
      let startX = 0;
      let scrollLeft = 0;

      const mouseDownHandler = (e: MouseEvent) => {
        isDown = true;
        slider.classList.add('active');
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
      };

      const mouseLeaveHandler = () => {
        isDown = false;
        slider.classList.remove('active');
      };

      const mouseUpHandler = () => {
        isDown = false;
        slider.classList.remove('active');
      };

      const mouseMoveHandler = (e: MouseEvent) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 2;
        slider.scrollLeft = scrollLeft - walk;
      };

      slider.addEventListener('mousedown', mouseDownHandler);
      slider.addEventListener('mouseleave', mouseLeaveHandler);
      slider.addEventListener('mouseup', mouseUpHandler);
      slider.addEventListener('mousemove', mouseMoveHandler);

      return () => {
        slider.removeEventListener('mousedown', mouseDownHandler);
        slider.removeEventListener('mouseleave', mouseLeaveHandler);
        slider.removeEventListener('mouseup', mouseUpHandler);
        slider.removeEventListener('mousemove', mouseMoveHandler);
      };
    }, []);

    const themes = [
      { theme: 'portfolio', rating: 'WCAG AAA', palette: 'fire', files: ['variables.css', 'typography.css'] },
      { theme: 'scape', rating: 'WCAG AA', palette: 'forrest', files: ['test1.css', 'test2.css'] }
    ];

  return (
    <>
    <main>
    <div className="SiteContainer siteGrid">
        <section className='FrontPage-intro sitegrid-halfWidth--left'>
          <h1 className=''>Welcome</h1>
          <p className="FrontPage-slogan ">Let us set the tone.</p>
          <h2>pal · at · a · ble</h2>
          <p>
            Meaning acceptable and pleasing to the taste and mind. <br/>  
            Here at Palatable we strive to set the palette for your projects with good aesthetics in mind, 
            without compromising on accessibility.
          </p>
          <button>
            How it works <img src={arrow}/>
          </button>
          
        </section>
        <div className='slider-container'>
          <span className='overlay'></span>
          <div className='CardPalette-slider sitegrid-halfWidth--right'>
            {themes.map((item) => (
              <PaletteCard key={item.theme} theme={item.theme} rating={item.rating} palette={item.palette} files={item.files} />
            ))}
          </div>
        </div>
        
    </div>
  </main>
  </>
  )
}



export default mainPage