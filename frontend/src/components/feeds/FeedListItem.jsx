const IMAGE_SIZE = 20;

export default function FeedListItem({ feed, onEdit, onDelete }) {
    const {
        id,
        title,
        folderNames,
        feedItemCount,
        iconUrl
    } = feed;

    const folders = folderNames?.join(', ') || 'No folder';

    return (
        <div className="feed-item">
            {
                iconUrl && (
                    <img 
                        src={iconUrl} 
                        alt="" 
                        width={IMAGE_SIZE} 
                        height={IMAGE_SIZE} 
                    />
                )
            }
            <span className="feed-item__title">{title}</span>
            <span className="feed-item__category">{folders}</span>
            <span className="feed-item__count">{feedItemCount} news</span>
            <button onClick={() => onEdit(feed)}>Edit</button>
            <button onClick={() => onDelete(id)}>Delete</button>
        </div>
    );
}