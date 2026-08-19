import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { changePassword } from 'Actions/authActions';


const FormStatus = Object.freeze({
    Idle: 'idle',
    Saving: 'saving',
    Saved: 'saved'
});

export default function ChangePasswordForm() {
    const dispatch = useDispatch();
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [status, setStatus] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        setError(null);
        setStatus(FormStatus.Saving);

        const result = await dispatch(changePassword({ currentPassword, newPassword }));

        if (changePassword.fulfilled.match(result)) {
            setStatus(FormStatus.Saved);
            setCurrentPassword('');
            setNewPassword('');
        } else {
            setStatus(FormStatus.Idle);
            setError(result.payload || 'Something went wrong');
        }
    }, [dispatch, currentPassword, newPassword]);

    return (
        <form 
            className="form-row" 
            onSubmit={handleSubmit} 
            style={{ flexDirection: 'column' }}
        >
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
            <button type="submit" disabled={status === FormStatus.Saving}>
                {status === FormStatus.Saving ? 'Saving...' : 'Change Password'}
            </button>
            {status === FormStatus.Saved && <p className="empty-text">Password updated.</p>}
            {error && <p className="error-text">{error}</p>}
        </form>
    );
}