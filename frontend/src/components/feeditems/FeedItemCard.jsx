import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { markItemRead, toggleItemFavorite, removeItem } from 'Actions/feedItemsActions';
import { useCallback } from 'react';

export default function FeedItemCard({ item }) {
    const dispatch = useDispatch();

    const {
        id,
        title,
        description,
        iconUrl,
        isRead,
        isFavorite
    } = item;

    const handleDelete = () => {
        if (window.confirm('Remove this item?')) dispatch(removeItem(item.id));
    };

    const onMarkReadClick = useCallback(() => {
        dispatch(markItemRead({
            itemId: id, 
            isRead: !isRead
        }))
    },[dispatch, id, isRead]);
    
    const onMarkFavoriteClick = useCallback(() => {
        dispatch(markItemFavorite({
            itemId: id, 
            isFavorite: !isFavorite
        }))
    },[dispatch, id, isFavorite]);

    return (
        <div className="item-card">
            {iconUrl && (
                <img
                    className="item-card__icon"
                    src={iconUrl}
                    alt=""
                    onError={(e) => { e.target.style.display = 'none'; }}
                />
            )}
            <Link to={`/feed-items/${id}`}><h3>{title}</h3></Link>
            <p>{description}</p>
            <div className="item-card__actions">
                <button
                    className="ghost"
                    onClick={onMarkReadClick}
                >
                    {isRead ? 'Mark unread' : 'Mark read'}
                </button>
                <button
                    className="ghost"
                    onClick={onMarkFavoriteClick}
                >
                    {isFavorite ? '★ Favorited' : '☆ Favorite'}
                </button>
                <button className="danger" onClick={handleDelete}>Delete</button>
            </div>
        </div>
    );
}