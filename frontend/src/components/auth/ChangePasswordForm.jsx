import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { changePassword } from 'Actions/authActions';

export default function ChangePasswordForm() {
    const dispatch = useDispatch();
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [status, setStatus] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setStatus('saving');

        const result = await dispatch(changePassword({ currentPassword, newPassword }));

        if (changePassword.fulfilled.match(result)) {
            setStatus('saved');
            setCurrentPassword('');
            setNewPassword('');
        } else {
            setStatus(null);
            setError(result.payload || 'Something went wrong');
        }
    };

    return (
        <form className="form-row" onSubmit={handleSubmit} style={{ flexDirection: 'column' }}>
            <input
                type="password"
                placeholder="Current password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="New password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                minLength={6}
            />
            <button type="submit" disabled={status === 'saving'}>
                {status === 'saving' ? 'Saving...' : 'Change Password'}
            </button>
            {status === 'saved' && <p className="empty-text">Password updated.</p>}
            {error && <p className="error-text">{error}</p>}
        </form>
    );
}