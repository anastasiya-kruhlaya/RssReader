import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addItemToFeed } from 'Actions/feedItemsActions';
import { useForm } from 'Hooks/useForm';


const INITIAL = {
    title: '',
    description: '',
    link: '',
    publishDate: '',
    iconUrl: '',
};

export default function FeedItemForm({ feedId, onDone }) {
    const dispatch = useDispatch();
    const { 
        values, 
        handleChange, 
        reset, setValues
    } = useForm(INITIAL);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        const item = {
            title: values.title,
            description: values.description || null,
            link: values.link,
            publishDate: values.publishDate ? new Date(publishDate).toISOString() : new Date().toISOString(),
            iconUrl: values.iconUrl || null,
        };

        const result = await dispatch(addItemToFeed({ feedId, item }));

        if (result.meta.requestStatus === 'fulfilled') {
            reset();
            onDone();
        } else {
            setError(result.payload || 'Something went wrong');
        }
    };

    return (
        <form className="form-row" onSubmit={handleSubmit}>
            <input
                name="title"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <input
                name="description"
                placeholder="Description (optional)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <input
                name="link"
                type="url"
                placeholder="Link"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                required
            />
            <input
                name="publishDate"
                type="datetime-local"
                value={publishDate}
                onChange={(e) => setPublishDate(e.target.value)}
            />
            <input
                name="iconUrl"
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