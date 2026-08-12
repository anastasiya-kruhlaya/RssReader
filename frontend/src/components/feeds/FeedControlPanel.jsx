import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addFeed, editFeed, removeFeed } from 'Actions/feedsActions';
import { useDeleteFeed } from '../../hooks/useDeleteFeed';

export default function FeedControlPanel({ editingFeed, onDone }) {
    const dispatch = useDispatch();
    const [url, setUrl] = useState(editingFeed?.url || '');
    const [error, setError] = useState(null);

    const isEditing = Boolean(editingFeed);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        const action = isEditing
            ? editFeed({ id: editingFeed.id, url })
            : addFeed({ url });

        const result = await dispatch(action);

        if (result.meta.requestStatus === 'fulfilled') {
            setUrl('');
            onDone();
        } else {
            setError(result.payload || 'Something went wrong');
        }
    };

    return (
        <form className="control-form" onSubmit={handleSubmit}>
            <input
                className="control-form__input"
                type="url"
                placeholder="https://example.com/rss"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
            />
            <div className="control-form__actions">
                <button type="submit" className="btn btn--primary">
                    {isEditing ? 'Save' : 'Add Feed'}
                </button>
                <button type="button" className="btn btn--ghost" onClick={onDone}>
                    Cancel
                </button>
            </div>
            {error && <p className="control-form__error">{error}</p>}
        </form>
    );
}
