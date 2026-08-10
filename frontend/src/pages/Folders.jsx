import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFolders, removeFolder } from 'Actions/foldersActions';
import FolderForm from 'Components/folders/FolderForm';

export default function Folders() {
    const dispatch = useDispatch();
    const { list: folders, loading, error } = useSelector((state) => state.folders);
    const [editingFolder, setEditingFolder] = useState(null);

    useEffect(() => {
        dispatch(getFolders());
    }, [dispatch]);

    const handleDelete = (id) => {
        if (window.confirm('Delete this folder?')) {
            dispatch(removeFolder(id));
        }
    };

    return (
        <div className="page">
            <section className="section">
                <div className="section-header">
                    <h2>My Folders ({folders.length})</h2>
                    {editingFolder !== 'new' && (
                        <button onClick={() => setEditingFolder('new')}>+ Create Folder</button>
                    )}
                </div>

                {(editingFolder === 'new' || (editingFolder && editingFolder !== 'new')) && (
                    <FolderForm
                        editingFolder={editingFolder === 'new' ? null : editingFolder}
                        onDone={() => setEditingFolder(null)}
                    />
                )}

                {loading && <p className="empty-text">Loading...</p>}
                {error && <p className="error-text">{error}</p>}
                {!loading && folders.length === 0 && (
                    <p className="empty-text">No folders yet — create your first one above.</p>
                )}

                {folders.map((folder) => (
                    <div className="feed-item" key={folder.id}>
                        <span className="feed-item__title">{folder.name}</span>
                        <span className="feed-item__count">{folder.feedCount ?? 0} feeds</span>
                        <div className="feed-item__actions">
                            <button className="ghost" onClick={() => setEditingFolder(folder)}>Rename</button>
                            <button className="danger" onClick={() => handleDelete(folder.id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </section>
        </div>
    );
}