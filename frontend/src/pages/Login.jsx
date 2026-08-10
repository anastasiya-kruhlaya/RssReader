import { login } from 'Actions/authActions';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';


export default function Login() {
    const dispatch = useDispatch();
    const { status, error, isAuthenticated } = useSelector((state) => state.auth);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login({ email, password }));
    }

    if(isAuthenticated) 
        return <p>Logged in!</p>
    
    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required 
            />
            <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required 
            />
            <button
                type="submit"
                disabled={status === 'loading'}    
            >
                {status === 'loading' ? 'Logging in...' : 'Login'}
            </button>
            {error && <p>{error}</p>}
        </form>
    );
};