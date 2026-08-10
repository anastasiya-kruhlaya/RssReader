import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getItemsByFeed, removeItem, markItemRead, toggleItemFavorite } from 'Actions/feedItemsActions';
import FeedItemForm from 'Components/feeditems/FeedItemForm';

export default function FeedItemsByFeed() {
    const { feedId } = useParams();
    const dispatch = useDispatch();
    const { list: items, loading, error } = useSelector((state) => state.feedItems);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        dispatch(getItemsByFeed({ feedId: Number(feedId) }));
    }, [dispatch, feedId]);

    const handleDelete = (id) => {
        if (window.confirm('Remove this item?')) {
            dispatch(removeItem(id));
        }
    };

    return (
        <div className="page">
            <section className="section">
                <div className="section-header">
                    <h2>Feed Items</h2>
                    {!showForm && <button onClick={() => setShowForm(true)}>+ Add Item</button>}
                </div>

                {showForm && (
                    <FeedItemForm feedId={feedId} onDone={() => setShowForm(false)} />
                )}

                {loading && <p className="empty-text">Loading items...</p>}
                {error && <p className="error-text">{error}</p>}
                {!loading && items.length === 0 && (
                    <p className="empty-text">No items in this feed yet.</p>
                )}

                {items.map((item) => (
                    <div className="item-card" key={item.id}>
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                        <div>
                            <button
                                className="ghost"
                                onClick={() => dispatch(markItemRead({ itemId: item.id, isRead: !item.isRead }))}
                            >
                                {item.isRead ? 'Mark unread' : 'Mark read'}
                            </button>
                            <button
                                className="ghost"
                                onClick={() => dispatch(toggleItemFavorite({ itemId: item.id, isFavorite: !item.isFavorite }))}
                            >
                                {item.isFavorite ? '★ Favorited' : '☆ Favorite'}
                            </button>
                            <button className="danger" onClick={() => handleDelete(item.id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </section>
        </div>
    );
}