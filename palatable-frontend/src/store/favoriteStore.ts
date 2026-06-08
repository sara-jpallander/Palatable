import {create} from 'zustand';
import {persist} from 'zustand/middleware';


type Palette = {
  theme: string,
  rating: string,
  palette: string,
  files: string[]
}

type FavState = {
  favorites: Palette[],
  toggleFavorites: (palette: Palette) => void,
  isFavorite: (theme: string) => boolean
}

export const favoriteStore = create<FavState>() (
  persist(
    (set, get) => ({
      favorites: [],
      toggleFavorites: (palette) => {
      const current = get().favorites;
      const exists = current.find((p) => p.theme === palette.theme);

      //Kollar om en favorit redan existerar i din profil och ersätter den.
      if(exists){
        set({favorites: current.filter((p) => p.theme !== palette.theme)})
        //Annars lägg till.
      }else{
        set({favorites: [...current, palette]});
      }
      },
      isFavorite: (theme) => {
        return get().favorites.some((p) => p.theme === theme);
      },
    }),
    {name: 'favorite-storage'}
  )
)

