import {useState, type ChangeEvent, type SubmitEvent} from 'react';
import { useAuthStore } from '../../store/authStore';

const signupForm = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const login = useAuthStore((state) => state.login);

    const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }

    const handleSignup = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const res = await fetch('http://localhost:3008/users/register', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  name,
                  email,
                  password,
                }),
              })
              const data = await res.json();

              if(!res.ok) {
                throw new Error(data.message || 'Signup misslyckad');
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
        <form onSubmit={handleSignup}>
        <label htmlFor="name">Skriv in ditt namn här:</label>
        <input type="text" id="name" name="name" value={name} onChange={handleNameChange}/>

            <label htmlFor="email">Skriv in din Email här:</label>
            <input type="text" id="email" name="email" value={email} onChange={handleEmailChange}/>

            <label htmlFor="password">Skriv in ditt Lösenord här:</label>
            <input type="password" id="password" name="password" value={password} onChange={handlePasswordChange}/>
            
            <button type="submit">Registrera</button>
        </form>
    </main>
        </>
    )
}

export default signupForm