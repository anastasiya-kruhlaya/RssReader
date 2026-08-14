import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { markItemRead, toggleItemFavorite, removeItem } from 'Actions/feedItemsActions';

export default function FeedItemCard({ item }) {
    const dispatch = useDispatch();

    const handleDelete = () => {
        if (window.confirm('Remove this item?')) dispatch(removeItem(item.id));
    };

    return (
        <div className="item-card">
            <Link to={`/feed-items/${item.id}`}><h3>{item.title}</h3></Link>
            <p>{item.description}</p>
            <div className="item-card__actions">
                <button
                    className="ghost"
                    onClick={() => 
                        dispatch(markItemRead({ 
                            itemId: item.id, 
                            isRead: !item.isRead 
                        }
                    )
                )}
                >
                    {item.isRead ? 'Mark unread' : 'Mark read'}
                </button>
                <button
                    className="ghost"
                    onClick={() => 
                        dispatch(toggleItemFavorite({ 
                            itemId: item.id, 
                            isFavorite: !item.isFavorite 
                        }
                    )
                )}
                >
                    {item.isFavorite ? '★ Favorited' : '☆ Favorite'}
                </button>
                <button className="danger" onClick={handleDelete}>Delete</button>
            </div>
        </div>
    );
}