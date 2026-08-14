import { useDispatch } from 'react-redux';


export default function FeedItemDetails() {
    const dispatch = useDispatch();
    const { list: items, loading, error } = useSelector((state) => state.feedItems)

    return (
        <div className="page">
            <section className="section">
                <div className="section-header"></div>
            </section>
        </div>
    )
}