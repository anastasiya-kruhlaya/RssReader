import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGlobalItems, removeItem, toggleItemFavorite, markItemRead } from 'Actions/feedItemsActions';

export default function AllFeedItems() {
    const dispatch = useDispatch();
    const { list: items, loading, error } = useSelector((state) => state.feedItems);

    useEffect(() => {
        dispatch(getGlobalItems());
    }, [dispatch]);

    const handleDelete = (id) => {
        if (window.confirm('Remove this item?')) {
            dispatch(removeItem(id));
        }
    };

    if (loading) return <p className="empty-text">Loading items...</p>;
    if (error) return <p className="error-text">{error}</p>;

    return (
        <div className="page">
            <section className="section">
                <div className="section-header">
                    <h2>Feed Items</h2>
                </div>

                {items.length === 0 && <p className="empty-text">No items yet.</p>}

                {items.map((item) => (
                    <div className="item-card" key={item.id}>
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                        <div>
                            <button
                                className="ghost"
                                onClick={() => 
                                    dispatch(markItemRead({ itemId: item.id, isRead: !item.isRead }))
                                }
                            >
                                {item.isRead ? 'Mark unread' : 'Mark read'}
                            </button>
                            <button
                                className="ghost"
                                onClick={() => 
                                    dispatch(toggleItemFavorite({ itemId: item.id, isFavorite: !item.isFavorite }))
                                }
                            >
                                {item.isFavorite ? '★ Favorited' : '☆ Favorite'}
                            </button>
                            <button 
                                className="danger" 
                                onClick={() => 
                                    handleDelete(item.id)
                                }
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </section>
        </div>
    );
}