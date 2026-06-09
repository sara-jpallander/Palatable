import {useState, type ChangeEvent, type SubmitEvent} from 'react'
import { useAuthStore } from "../store/authStore";
import '../assets/css/index.css';
import { favoriteStore } from '../store/favoriteStore';
import PaletteCard from '../components/card-palette';

const profilePage = () => {
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);
  const login = useAuthStore((state) => state.login);
  const [name, setName] = useState(user!.name);
  const [email, setEmail] = useState(user!.email);
  const [password, setPassword] = useState('');
  const favorites = favoriteStore((state) => state.favorites);
  const userFavorites = user ? favorites[user.id] || [] : [];

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
};

const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
};

const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
};

  

  const handleUpdate = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    

    try {
      const res = await fetch(`http://localhost:3008/users/${user!.id}`, {
          method: "PUT",
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            email,
            ...(password && { password }),
          }),
        });
        const data = await res.json();

        if (!res.ok) {
          alert(data.message || data.error || 'Update failed');
          return;
        }

        login(token!, {
          id: user!.id,
          name: data.data.name,
          email: data.data.email,
        });
        setPassword('');
        alert("Update successful");

    }
    catch {
        alert('Update failed');
    }
};


  return (
    <>
    {user ? (
      <>
        <div className="Profile FormContainer">
          <form className="Profile FormContainer-form" onSubmit={handleUpdate}>
            <h1>Welcome to your stuff {name}.</h1>
            <h2>Need something changed?</h2>
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" value={name} onChange={handleNameChange} placeholder="New name"/>

              <label htmlFor="email">Email</label>
              <input type="text" id="email" name="email" value={email} onChange={handleEmailChange} placeholder="example@email.com"/>

              <label htmlFor="password">Password</label>
              <input type="password" autoComplete="off" id="password" name="password" value={password} onChange={handlePasswordChange} placeholder="••••••••"/>

              
              <button type="submit" className="button--black">Save</button>
          </form>
        </div>
      <div className="SiteContainer Profile">
          <h2>My Favorites</h2>
          <div className="CardPalette-slider">
          {userFavorites.length > 0 ? (
              userFavorites.map((item) => (
                <PaletteCard 
                  key={item.theme} 
                  theme={item.theme} 
                  rating={item.rating} 
                  palette={item.palette} 
                  files={item.files} 
                />
              ))
            ) : (
              <p>No saved palettes yet.</p>
            )}
          </div>
        </div>
      </>
      ) : 
      <>
      <p>No user logged in</p>
      </>
    }
      
      
    </>
  );
};

export default profilePage;
