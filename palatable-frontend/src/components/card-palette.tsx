import '../assets/css/index.css'
import heart from '../assets/images/heart.svg'
import greenCheck from '../assets/images/green_check.svg'
import DownloadButtons from './ButtonsForCards/downLoadButtons'
import { favoriteStore } from '../store/favoriteStore'

interface PaletteCardProps {
  theme: string;
  rating: string;
  palette: string;
  files: string[];
}

function PaletteCard({ theme, rating, palette, files }: PaletteCardProps) {

  const toggleFavorite = favoriteStore((state) => state.toggleFavorites);
  const isFavorite = favoriteStore((state) => state.isFavorite(theme));

  const handleLike = () => {
    toggleFavorite({theme, rating, palette, files})
  }

  return (
    <div className={`PaletteCard-container ${theme}`}>
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
            <h2>{theme}</h2>
            <img src={heart} onClick={handleLike}
             style={{ 
            cursor: 'pointer',
            filter: isFavorite ? 'invert(20%) sepia(100%) saturate(500%) hue-rotate(350deg)' : 'none' 
            }}  
            alt="Like Button Heart" />
          </section>
          <p><img src={greenCheck} alt="WCAG Grade Check" />{rating}</p>
          <DownloadButtons palette={palette} files={files}/>
      </div>
    </div>
  )
}

export default PaletteCard
