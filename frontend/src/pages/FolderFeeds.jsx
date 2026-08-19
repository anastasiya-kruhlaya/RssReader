import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getFeedsInFolder } from 'Actions/foldersActions';

export default function FolderFeeds() {
    const { folderId } = useParams();
    const dispatch = useDispatch();
    const { folderFeeds: feeds, loading, error } = useSelector((state) => state.folders);

    useEffect(() => {
        dispatch(getFeedsInFolder(folderId));
    }, [dispatch, folderId]);

    return (
        <div className="page">
            <section className="section">
                <div className="section-header"><h2>Folder Feeds</h2></div>
                {loading && <p className="empty-text">Loading...</p>}
                {error && <p className="error-text">{error}</p>}
                {!loading && feeds.length === 0 && <p className="empty-text">No feeds in this folder.</p>}
                {
                    feeds.map((feed) => (
                        <div className="feed-item" key={feed.id}>
                            <Link 
                                to={`/feeds/${feed.id}`} 
                                className="feed-item__title"
                            >
                                {feed.title || feed.url}
                            </Link>
                            <span className="feed-item__count">{feed.feedItemCount} items</span>
                        </div>)
                    )
                }
            </section>
        </div>
    );
}