import { combineReducers } from 'redux'
import feedsReducer from './feedsReducer'
import authReducer from './authReducer';
import feedItemsReducer from './feedItemsReducer';
import foldersReducer from './foldersReducer';


const rootReducer = combineReducers({
    feeds: feedsReducer,
    auth: authReducer,
    feedItems: feedItemsReducer,
    folders: foldersReducer,
});

export default rootReducer;