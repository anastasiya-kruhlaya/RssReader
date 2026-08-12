import { useDispatch } from 'react-redux';


export function useDeleteFeed() {
    const dispatch = useDispatch();
    return (id) => {
        if (window.confirm('Remove this feed?')) {
            dispatch(removeFeed(id));
        }
    };
}