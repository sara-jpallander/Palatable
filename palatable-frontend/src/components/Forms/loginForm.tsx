import {useState, type ChangeEvent, type SubmitEvent} from 'react';
import { useAuthStore } from '../../store/authStore';

const loginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const login = useAuthStore((state) => state.login);

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }

    const handleLogin = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const res = await fetch('http://localhost:3001/users/login', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  email,
                  password,
                }),
              })
              const data = await res.json();

              if(!res.ok) {
                throw new Error(data.message || 'Login misslyckad');
              }
           
              login(data.token, data.user)
        }
        catch(error){
          console.error(error);
        }
    }
    return (
        <>
         <main>
        <form onSubmit={handleLogin}>
            <label htmlFor="email">Skriv in din Email här:</label>
            <input type="text" id="email" name="email" value={email} onChange={handleEmailChange}/>

            <label htmlFor="password">Skriv in ditt Lösenord här:</label>
            <input type="password" id="password" name="password" value={password} onChange={handlePasswordChange}/>
            
            <button type="submit">Logga in</button>
        </form>
    </main>
        </>
    )
}

export default loginForm