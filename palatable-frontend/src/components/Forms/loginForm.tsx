import {useState, type ChangeEvent, type SubmitEvent} from 'react';
import { useAuthStore } from '../../store/authStore';
import { useNavigate } from 'react-router';
import '../../assets/css/components/login-form.css';

const loginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [errorField, setErrorField] = useState<'email' | 'password' | null>(null);

    const login = useAuthStore((state) => state.login);
    
    const navigate = useNavigate();

    const clearError = () => {
        setErrorMessage(null);
        setErrorField(null);
    };

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        if (errorField === 'email') clearError();
    }

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        if (errorField === 'password') clearError();
    }

    const handleLogin = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        clearError();

        try {
            const res = await fetch('http://localhost:3008/users/login', {
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

              if (!res.ok) {
                const message = data.message || data.error || 'Login misslyckad';
                setErrorMessage(message);
                setErrorField(res.status === 404 ? 'email' : res.status === 400 ? 'password' : null);
                return;
              }
           
              login(data.token, data.user)
              navigate('/');
        }
        catch {
            setErrorMessage('Login misslyckad');
            setErrorField(null);
          }
    }

    const getInputClassName = (field: 'email' | 'password') =>
      `LoginForm-input${errorField === field ? ' LoginForm-input--error' : ''}`;

    return (
        <>
         <div className="LoginForm-container">
        <form className="LoginForm-container-form" onSubmit={handleLogin}>
            <label htmlFor="email">Email</label>
            <input className={getInputClassName('email')} type="text" id="email" name="email" value={email} onChange={handleEmailChange} placeholder="Skriv din email här..."/>

            <label htmlFor="password">Lösenord</label>
            <input className={getInputClassName('password')} type="password" autoComplete="off" id="password" name="password" value={password} onChange={handlePasswordChange} placeholder="Skriv ditt lösenord här..."/>

            {errorMessage && (
              <p className="LoginForm-error" role="alert">{errorMessage}</p>
            )}
            
            <button type="submit">Logga in</button>
        </form>
        </div>
        </>
    )
}

export default loginForm