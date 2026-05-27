//man skapar en store som håller reda på om användaren är inloggad eller inte, och även användarens token
import {create} from "zustand"; 
import {persist} from "zustand/middleware"; 

//vi skapar ett interface för vår user, som innehåller id, name och email. Samma som i vår backend User model
interface User {
 id: string
 name: string
 email: string
}
//vi skapar ett interface för vår auth state som innehåller token, user, login och logout. Token är en string eller null, user är en User eller null, login är en funktion som tar in en token och en user returnerar void, log out är en funktion som returnerar void
interface AuthState {
token: string | null
user: User | null
login: (token: string, user: User) => void
logout: () => void 
}
//auth store med Zustand + persist 
//sparar autentiseringsdata (token och user) i localstorage så att inloggning överlever refresh. 
 export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      //initial state: ingen användare inloggad  
      token: null,
      user: null,
      //sparar token och user vid login
      login: (token, user) => set({ token, user }),
      //rensar state vid logout. 
      logout: () => set({ token: null, user: null }),
    }),
    {name:"auth-storage"} // nyckeln i localstorage där auth data kommer att spara
  )
);