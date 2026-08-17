import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { register } from 'Actions/authActions';

export default function Register() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { status, error } = useSelector((state) => state.auth);
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await dispatch(register({ userName, email, password }));
        if (register.fulfilled.match(result)) {
            navigate('/');
        }
    };

    return (
        <div className="auth-page">
            <div className="page">
                <h1>Create Account</h1>
                <form onSubmit={handleSubmit} className="form-row" style={{ flexDirection: 'column' }}>
                    <input
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        placeholder="Username"
                        required
                    />
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
                    <button type="submit" disabled={status === 'loading'}>
                        {status === 'loading' ? 'Creating...' : 'Create Account'}
                    </button>
                    {error && <p className="error-text">{error}</p>}
                </form>
            </div>
        </div>
    );
}