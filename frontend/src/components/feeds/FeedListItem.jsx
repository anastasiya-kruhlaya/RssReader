const IMAGE_SIZE = 20;
export default function FeedListItem({ feed, onEdit, onDelete }) {
    const {
        id,
        title,
        categoryName,
        totalNewsCount
    } = feed;
    return (
        <div className="feed-item">
            {feed.iconUrl && (
                <img 
                    src={feed.iconUrl} 
                    alt="" 
                    width={IMAGE_SIZE} 
                    height={IMAGE_SIZE} />
                )
            }
            <span className="feed-item__title">{title}</span>
            <span className="feed-item__category">{categoryName}</span>
            <span className="feed-item__count">{totalNewsCount} news</span>
            <button onClick={() => onEdit(feed)}>Edit</button>
            <button onClick={() => onDelete(id)}>Delete</button>
        </div>
    );
}