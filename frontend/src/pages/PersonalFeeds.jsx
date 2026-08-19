import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getFeeds, removeFeed } from 'Actions/feedsActions';
import FeedForm from 'Components/feeds/FeedForm';
import AddToFolderButton from 'Components/feeds/AddToFolderButton';

export default function PersonalFeeds() {
    const dispatch = useDispatch();
    const { list: feeds, loading, error } = useSelector((state) => state.feeds);
    const [editingFeed, setEditingFeed] = useState(null);

    useEffect(() => {
        dispatch(getFeeds());
    }, [dispatch]);

    const handleDelete = (id) => {
        if (window.confirm('Remove this feed?')) {
            dispatch(removeFeed(id));
        }
    };

    return (
        <div className="page">
            <section className="section">
                <div className="section-header">
                    <h2>My Feeds ({feeds.length})</h2>
                    {editingFeed !== 'new' && (
                        <button onClick={() => setEditingFeed('new')}>+ Add Feed</button>
                    )}
                </div>

                {(editingFeed === 'new' || (editingFeed && editingFeed !== 'new')) && (
                    <FeedForm
                        editingFeed={editingFeed === 'new' ? null : editingFeed}
                        onDone={() => setEditingFeed(null)}
                    />
                )}

                {loading && <p className="empty-text">Loading...</p>}
                {error && <p className="error-text">{error}</p>}
                {!loading && feeds.length === 0 && (
                    <p className="empty-text">You haven't added any feeds yet.</p>
                )}

                {feeds.map((feed) => (
                    <div className="feed-item" key={feed.id}>
                        <Link to={`/feeds/${feed.id}`} className="feed-item__title">
                            {feed.title || feed.url}
                        </Link>
                        <div className="feed-item__actions">
                            <AddToFolderButton feedId={feed.id} />
                            <button className="ghost" onClick={() => setEditingFeed(feed)}>Edit</button>
                            <button className="danger" onClick={() => handleDelete(feed.id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </section>
        </div>
    );
}