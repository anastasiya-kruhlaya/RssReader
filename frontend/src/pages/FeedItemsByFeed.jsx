import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getItemsByFeedGrouped, removeItem, markItemRead, toggleItemFavorite } from 'Actions/feedItemsActions';
import FeedItemForm from 'Components/feeditems/FeedItemForm';
import FeedItemCard from 'Components/feeditems/FeedItemCard';

export default function FeedItemsByFeed() {
    const { feedId } = useParams();
    const dispatch = useDispatch();
    const [showForm, setShowForm] = useState(false);
    const { grouped, loading, error } = useSelector((state) => state.feedItems);

    useEffect(() => {
        dispatch(getItemsByFeedGrouped({ feedId: Number(feedId) }));
    }, [dispatch, feedId]);

    const sections = [
        ['Today', grouped?.today],
        ['Yesterday', grouped?.yesterday],
        ['Last 7 Days', grouped?.lastWeek],
        ['Older', grouped?.older],
    ];

    const handleFormDone = () => {
        setShowForm(false);
        dispatch(getItemsByFeedGrouped({ feedId: Number(feedId) }));
    };

    return (
        <div className="page">
            <section className="section">
                <div className="section-header">
                    <h2>Feed Items</h2>
                    <button onClick={() => setShowForm(true)}>Add Item</button>
                </div>
                {showForm && (
                    <FeedItemForm 
                        feedId={feedId} 
                        onDone={handleFormDone}
                    />
                )}
                {loading && <p className="empty-text">Loading...</p>}
                {error && <p className="error-text">{error}</p>}
                {sections.map(([label, list]) =>
                    list && list.length > 0 && (
                        <div key={label}>
                            <div className="group-heading">{label}</div>
                            {list.map((item) => 
                                <FeedItemCard 
                                    key={item.id} 
                                    item={item} />
                                )
                            }
                        </div>
                    )
                )}
            </section>
        </div>
    );
}