import {create} from 'zustand';
import {persist} from 'zustand/middleware';


type Palette = {
  theme: string,
  rating: string,
  palette: string,
  files: string[]
}

type FavState = {
  favorites: { [userId: string]: Palette[] },
  toggleFavorites: (userId: string, palette: Palette) => void,
  isFavorite: (userId: string, theme: string) => boolean
}

export const favoriteStore = create<FavState>() (
  persist(
    (set, get) => ({
      favorites: {},
      toggleFavorites: (userId, palette) => {
      const current = get().favorites;
      const userFavorites = current[userId] || [];
      const exists = userFavorites.find((p) => p.theme === palette.theme);

      let updatedList;
      //Kollar om en favorit redan existerar i din profil och ersätter den.
      if (exists) {
        updatedList = userFavorites.filter((p) => p.theme !== palette.theme);
      } else {
        updatedList = [...userFavorites, palette];
      }
      set({
        favorites: {
          ...current,
          [userId]: updatedList
        }
      });
      },
      isFavorite: (userId, theme) => {
        const userFavorites = get().favorites[userId] || [];
        return userFavorites.some((p) => p.theme === theme);
      },
    }),
    {name: 'favorite-storage'}
  )
)

