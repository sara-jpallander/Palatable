import {useState, type ChangeEvent, type SubmitEvent} from 'react';
import { useAuthStore } from '../../store/authStore';
import { useNavigate } from 'react-router';
import '../../assets/css/index.css';

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
                const message = data.message || data.error || 'Login failed';
                setErrorMessage(message);
                setErrorField(res.status === 404 ? 'email' : res.status === 400 ? 'password' : null);
                return;
              }
           
              login(data.token, data.user)
              navigate('/');
        }
        catch {
            setErrorMessage('Login failed');
            setErrorField(null);
          }
    }

    const getInputClassName = (field: 'email' | 'password') =>
      `LoginForm-input${errorField === field ? ' LoginForm-input--error' : ''}`;

    return (
        <>
         <div className="Login FormContainer">
            
            <form className="Login FormContainer-form" onSubmit={handleLogin}>
                <h1>It's you again!</h1>
                <label htmlFor="email">Email</label>
                <input className={getInputClassName('email')} type="text" id="email" name="email" value={email} onChange={handleEmailChange} placeholder="example@email.com"/>

                <label htmlFor="password">Password</label>
                <input className={getInputClassName('password')} type="password" autoComplete="off" id="password" name="password" value={password} onChange={handlePasswordChange} placeholder="••••••••"/>

                {errorMessage && (
                <p className="Login Form-error" role="alert">{errorMessage}</p>
                )}
                
                <button type="submit" className="button--black">Log in</button>
            </form>
        </div>
        </>
    )
}

export default loginForm