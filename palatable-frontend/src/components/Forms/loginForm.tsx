import {useState} from 'react';

const loginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }
    return (
        <>
         <main>
        <form>
            <label htmlFor="email">Skriv in din Email här:</label>
            <input type="text" id="email" name="email" value={email} onChange={handleEmailChange}/>

            <label htmlFor="password">Skriv in ditt Lösenord här:</label>
            <input type="password" id="password" name="password" value={password} onChange={handlePasswordChange}/>
            
        </form>
    </main>
        </>
    )
}

export default loginForm