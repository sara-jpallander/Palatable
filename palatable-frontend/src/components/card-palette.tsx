import '../assets/css/index.css'
import heart from '../assets/images/heart.svg'
import greenCheck from '../assets/images/green_check.svg'
import DownloadButtons from './ButtonsForCards/downLoadButtons'

interface Props {
  palette: string;
  files: string[];
}

function PaletteCard({ palette, files }: Props) {

  return (
    <div className='PaletteCard-container'>
      <div className="PaletteCard-container--top">
          <section className='PaletteCard-preview--text'>
            <h3>Lorem</h3>
            <section>
              <h4>Ipsum</h4>
              <p>Lorem Ipsum is a standard dummy text used in printing, typesetting, and digital design to fill space and demonstrate layout without distracting from the visual presentation.</p>
            </section>
          </section>
          <div className='PaletteCard-preview--color'>
            <span className='color-1'></span>
            <span className='color-2'></span>
            <span className='color-3'></span>
            <span className='color-4'></span>
          </div>
      </div>
      <div className="PaletteCard-container--bottom">
          <section className='PaletteCard-title flex-SpaceBetween'>
            {/* title */}
            <h2>Portfolio</h2>
            <img src={heart} alt="Like Button Heart" />
          </section>
          <p><img src={greenCheck} alt="WCAG Grade Check" />WCAG AAA</p>
          <DownloadButtons palette={palette} files={files}/>
      </div>
    </div>
  )
}

export default PaletteCard
