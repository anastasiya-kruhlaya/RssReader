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
        values: {
            title,
            description,
            link,
            publishDate,
            iconUrl,
        }, 
        handleChange, 
        reset, 
        setValues
    } = useForm(INITIAL);

    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        const item = {
            Title: title,
            Description: description || null,
            Link: link,
            PublishDate: publishDate 
                ? new Date(publishDate).toISOString() 
                : new Date().toISOString(),
            IconUrl: iconUrl || null,
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
        <form 
            className="form-row" 
            onSubmit={handleSubmit}
        >
            <input
                name="title"
                placeholder="Title"
                value={title}
                onChange={handleChange}
                required
            />
            <input
                name="description"
                placeholder="Description (optional)"
                value={description}
                onChange={handleChange}
            />
            <input
                name="link"
                type="url"
                placeholder="Link"
                value={link}
                onChange={handleChange}
                required
            />
            <input
                name="publishDate"
                type="datetime-local"
                value={publishDate}
                onChange={handleChange}
            />
            <input
                name="iconUrl"
                type="url"
                placeholder="Icon URL (optional)"
                value={iconUrl}
                onChange={handleChange}
            />

            <div className="form-row">
                <button type="submit">Add Item</button>
                <button 
                    type="button" 
                    className="ghost" onClick={onDone}
                >
                    Cancel
                </button>
            </div>
            {error && <p className="error-text">{error}</p>}
        </form>
    );
}