import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPersonalItems, removeItem, markItemRead, toggleItemFavorite } from 'Actions/feedItemsActions';
import FeedItemCard from 'Components/feeditems/FeedItemCard';
import FeedItemFilters from 'Components/feeditems/FeedItemFilters';

export default function PersonalFeedItems() {
    const dispatch = useDispatch();
    const { list: items, loading, error } = useSelector((state) => state.feedItems);

    useEffect(() => {
        dispatch(getPersonalItems());
    }, [dispatch]);

    return (
        <div className="page">
            <section className="section">
                <div className="section-header">
                    <h2>My Feed Items ({items.length})</h2>
                </div>

                <FeedItemFilters filters={filters} onChange={setFilters} />
                {loading && <p className="empty-text">Loading...</p>}
                {error && <p className="error-text">{error}</p>}
                {!loading && items.length === 0 && <p className="empty-text">No items match these filters.</p>}
                {items.map((item) => 
                    <FeedItemCard 
                        key={item.id} 
                        item={item} />
                    )
                }
            </section>
        </div>
    );
}