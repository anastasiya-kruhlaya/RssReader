import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addItemToFeed } from 'Actions/feedItemsActions';

export default function FeedItemForm({ feedId, onDone }) {
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [link, setLink] = useState('');
    const [publishDate, setPublishDate] = useState('');
    const [iconUrl, setIconUrl] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        const item = {
            title,
            description: description || null,
            link,
            publishDate: publishDate ? new Date(publishDate).toISOString() : new Date().toISOString(),
            iconUrl: iconUrl || null,
        };

        const result = await dispatch(addItemToFeed({ feedId, item }));

        if (result.meta.requestStatus === 'fulfilled') {
            setTitle('');
            setDescription('');
            setLink('');
            setPublishDate('');
            setIconUrl('');
            onDone();
        } else {
            setError(result.payload || 'Something went wrong');
        }
    };

    return (
        <form className="form-row" onSubmit={handleSubmit} style={{ flexDirection: 'column' }}>
            <input
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <input
                placeholder="Description (optional)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <input
                type="url"
                placeholder="Link"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                required
            />
            <input
                type="datetime-local"
                value={publishDate}
                onChange={(e) => setPublishDate(e.target.value)}
            />
            <input
                type="url"
                placeholder="Icon URL (optional)"
                value={iconUrl}
                onChange={(e) => setIconUrl(e.target.value)}
            />

            <div className="form-row">
                <button type="submit">Add Item</button>
                <button type="button" className="ghost" onClick={onDone}>Cancel</button>
            </div>
            {error && <p className="error-text">{error}</p>}
        </form>
    );
}