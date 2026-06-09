import '../assets/css/index.css'
import heart from '../assets/images/heart.svg'
import greenCheck from '../assets/images/green_check.svg'
import DownloadButtons from './ButtonsForCards/downLoadButtons'
import { favoriteStore } from '../store/favoriteStore'
import { useAuthStore } from '../store/authStore'

interface PaletteCardProps {
  theme: string;
  rating: string;
  palette: string;
  files: string[];
}

function PaletteCard({ theme, rating, palette, files }: PaletteCardProps) {

  const toggleFavorite = favoriteStore((state) => state.toggleFavorites);
  const user = useAuthStore((state) => state.user);
  const isFavorite = favoriteStore((state) => user ? state.isFavorite(user.id, theme) : false);

  const handleLike = () => {
    if (!user) {
      alert("Du måste vara inloggad för att spara favoriter!");
      return;
    }
    toggleFavorite(user.id, { theme, rating, palette, files }); // 4. Skicka med user.id här också
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
