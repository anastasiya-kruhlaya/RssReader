import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addFolder, editFolder } from 'Actions/foldersActions';

export default function FolderForm({ editingFolder, onDone }) {
    const dispatch = useDispatch();
    const [name, setName] = useState(editingFolder?.name || '');
    const [error, setError] = useState(null);
    const isEditing = Boolean(editingFolder);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        const action = isEditing
            ? editFolder({ id: editingFolder.id, name })
            : addFolder({ name });

        const result = await dispatch(action);

        if (result.meta.requestStatus === 'fulfilled') {
            setName('');
            onDone();
        } else {
            setError(result.payload || 'Something went wrong');
        }
    };

    return (
        <form className="form-row" onSubmit={handleSubmit}>
            <input
                placeholder="Folder name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <button type="submit">{isEditing ? 'Save' : 'Create Folder'}</button>
            <button type="button" className="ghost" onClick={onDone}>Cancel</button>
            {error && <p className="error-text">{error}</p>}
        </form>
    );
}