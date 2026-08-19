import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFeeds } from 'Actions/feedsActions';
import { getPersonalItems  } from 'Actions/feedItemsActions';
import { getFolders } from 'Actions/foldersActions';
import { updateProfile } from 'Actions/authActions';
import { Link } from 'react-router-dom';
import ChangePasswordForm from 'Components/auth/ChangePasswordForm';

export default function Profile() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const feeds = useSelector((state) => state.feeds.list);
    const items = useSelector((state) => state.feedItems.list);
    const folders = useSelector((state) => state.folders.list);

    const [userName, setUserName] = useState(user?.userName || '');
    const [email, setEmail] = useState(user?.email || '');
    const [status, setStatus] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        dispatch(getFeeds());
        dispatch(getPersonalItems());
        dispatch(getFolders());
    }, [dispatch]);

    useEffect(() => {
        setUserName(user?.userName || '');
        setEmail(user?.email || '');
    }, [user]);

    const handleSaveProfile = async (e) => {
        e.preventDefault();
        setError(null);
        setStatus('saving');

        const result = await dispatch(updateProfile({ userName, email }));

        if (updateProfile.fulfilled.match(result)) {
            setStatus('saved');
        } else {
            setStatus(null);
            setError(result.payload || 'Something went wrong');
        }
    };


    return (
        <div className="page">
            <h1>{user?.userName || 'Profile'}</h1>
            <p>{user?.email}</p>
            <section className="section">
                <div className="section-header">
                    <h2>Edit Profile</h2>
                </div>
                <form className="form-row" onSubmit={handleSaveProfile} style={{ flexDirection: 'column' }}>
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
                    <button type="submit" disabled={status === 'saving'}>
                        {status === 'saving' ? 'Saving...' : 'Save'}
                    </button>
                    {status === 'saved' && <p className="empty-text">Saved.</p>}
                    {error && <p className="error-text">{error}</p>}
                </form>
            </section>

            <section className="section">
                <div className="section-header">
                    <h2>Change Password</h2>
                </div>
                <ChangePasswordForm />
            </section>
            <section className="section">
                <div className="section-header">
                    <h2>Quick Actions</h2>
                </div>
                <div className="form-row">
                    <Link to="/personal-feeds"><button>+ Add Feed</button></Link>
                    <Link to="/feeds"><button className="ghost">Browse Feeds</button></Link>
                    <Link to="/folders"><button className="ghost">+ Create Folder</button></Link>
                </div>
            </section>
            <section className="section">
                <div className="section-header">
                    <h2>My Feeds ({feeds.length})</h2>
                    <Link to="/personal-feeds" className="ghost">View all →</Link>
                </div>
                {feeds.length === 0 && <p className="empty-text">No feeds yet.</p>}
                {feeds.slice(0, 3).map((f) => (
                    <div className="feed-item" key={f.id}>{f.title || f.url}</div>
                ))}
            </section>

            <section className="section">
                <div className="section-header">
                    <h2>My Feed Items ({items.length})</h2>
                    <Link to="/personal-feed-items" className="ghost">View all →</Link>
                </div>
                {items.length === 0 && <p className="empty-text">No items yet.</p>}
                {items.slice(0, 3).map((i) => (
                    <div className="item-card" key={i.id}>{i.title}</div>
                ))}
            </section>

            <section className="section">
                <div className="section-header">
                    <h2>My Folders ({folders.length})</h2>
                    <Link to="/folders" className="ghost">View all →</Link>
                </div>
                {folders.length === 0 && <p className="empty-text">No folders yet.</p>}
                {folders.slice(0, 3).map((f) => (
                    <div className="feed-item" key={f.id}>{f.name}</div>
                ))}
            </section>
        </div>
    )
}