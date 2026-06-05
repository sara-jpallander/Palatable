import {useState, type ChangeEvent, type SubmitEvent} from 'react';
import { useAuthStore } from '../../store/authStore';
import { useNavigate } from 'react-router';
import '../../assets/css/components/signup-form.css';

type SignupField = 'name' | 'email' | 'password';

interface ZodIssue {
    path: (string | number)[];
    message: string;
}

const parseSignupError = (data: {
    message?: string;
    error?: string;
    field?: string;
    details?: { issues?: ZodIssue[] };
}): { message: string; field: SignupField | null } => {
    const field = data.field;
    if (field === 'name' || field === 'email' || field === 'password') {
        return {
            message: data.message || data.error || 'Signup failed',
            field,
        };
    }

    const issue = data.details?.issues?.[0];
    if (issue) {
        const issueField = issue.path[0];
        if (issueField === 'name' || issueField === 'email' || issueField === 'password') {
            return { message: issue.message, field: issueField };
        }
    }

    return {
        message: data.message || data.error || 'Signup failed',
        field: null,
    };
};

const signupForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [errorField, setErrorField] = useState<SignupField | null>(null);

    const navigate = useNavigate();
    const login = useAuthStore((state) => state.login);

    const clearError = () => {
        setErrorMessage(null);
        setErrorField(null);
    };

    const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
        if (errorField === 'name') clearError();
    };

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        if (errorField === 'email') clearError();
    };

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        if (errorField === 'password') clearError();
    };

    const handleSignup = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        clearError();

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
              });
              const data = await res.json();

              if (!res.ok) {
                const { message, field } = parseSignupError(data);
                setErrorMessage(message);
                setErrorField(field);
                return;
              }
           
              login(data.token, data.user);
              navigate('/');
        }
        catch {
            setErrorMessage('Signup failed');
            setErrorField(null);
        }
    };

    const getInputClassName = (field: SignupField) =>
      `SignupForm-input${errorField === field ? ' SignupForm-input--error' : ''}`;

    return (
        <>
         <div className="SignupForm-container">
        <form className="SignupForm-container-form" onSubmit={handleSignup}>
            <label htmlFor="name">Name</label>
            <input className={getInputClassName('name')} type="text" id="name" name="name" value={name} onChange={handleNameChange} placeholder="Enter your name..."/>

            <label htmlFor="email">Email</label>
            <input className={getInputClassName('email')} type="text" id="email" name="email" value={email} onChange={handleEmailChange} placeholder="Enter your email..."/>

            <label htmlFor="password">Password</label>
            <input className={getInputClassName('password')} type="password" autoComplete="off" id="password" name="password" value={password} onChange={handlePasswordChange} placeholder="Enter your password..."/>

            {errorMessage && (
              <p className="SignupForm-error" role="alert">{errorMessage}</p>
            )}
            
            <button type="submit">Register</button>
        </form>
        </div>
        </>
    );
};

export default signupForm;
