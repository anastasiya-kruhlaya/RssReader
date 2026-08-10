import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../utils/api';
import urls from '../utils/urls';

export const getFolders = createAsyncThunk(
    'folders/getFolders',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get(urls.GET_FOLDERS_URL);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || err.message);
        }
    }
);

export const addFolder = createAsyncThunk(
    'folders/addFolder',
    async (folder, { rejectWithValue }) => {
        try {
            const response = await api.post(urls.ADD_FOLDER_URL, folder);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || err.message);
        }
    }
);

export const editFolder = createAsyncThunk(
    'folders/editFolder',
    async (folder, { rejectWithValue }) => {
        try {
            const response = await api.put(urls.EDIT_FOLDER_URL(folder.id), folder);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || err.message);
        }
    }
);

export const removeFolder = createAsyncThunk(
    'folders/removeFolder',
    async (id, { rejectWithValue }) => {
        try {
            await api.delete(urls.REMOVE_FOLDER_URL(id));
            return id;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || err.message);
        }
    }
);

export const addFeedToFolder = createAsyncThunk(
    'folders/addFeedToFolder',
    async ({ folderId, feedId }, { rejectWithValue }) => {
        try {
            const response = await api.post(urls.ADD_FEED_TO_FOLDER_URL(folderId, feedId));
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || err.message);
        }
    }
);

export const removeFeedFromFolder = createAsyncThunk(
    'folders/removeFeedFromFolder',
    async ({ folderId, feedId }, { rejectWithValue }) => {
        try {
            await api.delete(urls.REMOVE_FEED_FROM_FOLDER_URL(folderId, feedId));
            return { folderId, feedId };
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || err.message);
        }
    }
);

const foldersSlice = createSlice({
    name: 'folders',
    initialState: {
        list: [],
        loading: false,
        error: null,
    },
    reducers: {
        clearFoldersError(state) {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getFolders.pending, (state) => { 
                state.loading = true; state.error = null; 
            })
            .addCase(getFolders.fulfilled, (state, action) => { 
                state.loading = false; state.list = action.payload; 
            })
            .addCase(getFolders.rejected, (state, action) => { 
                state.loading = false; state.error = action.payload; 
            })
            .addCase(addFolder.fulfilled, (state, action) => { 
                state.list.push(action.payload); 
            })
            .addCase(editFolder.fulfilled, (state, action) => {
                const idx = state.list.findIndex((f) => f.id === action.payload.id);
                if (idx !== -1) state.list[idx] = action.payload;
            })
            .addCase(removeFolder.fulfilled, (state, action) => {
                state.list = state.list.filter((f) => f.id !== action.payload);
            })
            .addCase(addFeedToFolder.fulfilled, (state, action) => {
                const idx = state.list.findIndex((f) => f.id === action.payload.id);
                if (idx !== -1) state.list[idx] = action.payload; 
            })
            .addCase(removeFeedFromFolder.fulfilled, (state, action) => {
                const folder = state.list.find((f) => f.id === action.payload.folderId);
                if (folder?.feedIds) {
                    folder.feedIds = folder.feedIds.filter((id) => id !== action.payload.feedId);
                }
            })
    },
});

export const { clearFoldersError } = foldersSlice.actions;
export default foldersSlice.reducer;