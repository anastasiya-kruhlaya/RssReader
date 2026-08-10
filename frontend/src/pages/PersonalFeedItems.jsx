import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPersonalItems, removeItem, markItemRead, toggleItemFavorite } from 'Actions/feedItemsActions';

export default function PersonalFeedItems() {
    const dispatch = useDispatch();
    const { list: items, loading, error } = useSelector((state) => state.feedItems);

    useEffect(() => {
        dispatch(getPersonalItems());
    }, [dispatch]);

    const handleDelete = (id) => {
        if (window.confirm('Remove this item?')) {
            dispatch(removeItem(id));
        }
    };

    return (
        <div className="page">
            <section className="section">
                <div className="section-header">
                    <h2>My Feed Items ({items.length})</h2>
                </div>

                {loading && <p className="empty-text">Loading...</p>}
                {error && <p className="error-text">{error}</p>}
                {!loading && items.length === 0 && (
                    <p className="empty-text">No saved items yet.</p>
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