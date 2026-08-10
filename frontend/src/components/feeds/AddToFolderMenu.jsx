import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addFeedToFolder } from 'Actions/foldersActions';

export default function AddToFolderMenu({ feedId }) {
    const dispatch = useDispatch();
    const folders = useSelector((state) => state.folders.list);
    const [open, setOpen] = useState(false);

    const handleAdd = (folderId) => {
        dispatch(addFeedToFolder({ folderId, feedId }));
        setOpen(false);
    };

    return (
        <div className="add-to-folder">
            <button className="ghost" onClick={() => setOpen((o) => !o)}>+ Folder</button>
            {open && (
                <ul className="add-to-folder__list">
                    {folders.length === 0 && <li className="empty-text">No folders yet</li>}
                    {folders.map((folder) => (
                        <li key={folder.id}>
                            <button onClick={() => handleAdd(folder.id)}>{folder.name}</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}