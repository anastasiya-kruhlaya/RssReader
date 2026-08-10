import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../utils/api';
import urls from '../utils/urls';
import { isTokenValid } from '../utils/tokenUtils';

const storedToken = localStorage.getItem('token');
const tokenIsValid = isTokenValid(storedToken);

if (storedToken && !tokenIsValid) {
    localStorage.removeItem('token');
}

export const login = createAsyncThunk(
    'auth/login',
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await api.post(urls.LOGIN_URL, credentials);
            localStorage.setItem('token', response.data.token);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || err.message);
        }
    }
);

export const register = createAsyncThunk(
    'auth/register',
    async(payload, { rejectWithValue }) => {
        try{
            const response = await api.post(urls.REGISTER_URL, payload);
            localStorage.setItem('token', response.data.token);

            return response.data;
        }
        catch (err) {
            return rejectWithValue(err.response?.data?.message || err.message);
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        token: tokenIsValid ? storedToken : null,
        isAuthenticated: tokenIsValid,
        status: 'idle',
        error: null,
    },
    reducers: {
        logout(state) {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            localStorage.removeItem('token');
        },
        clearAuthError(state) {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.token = action.payload.token;
                state.user = action.payload.user ?? null;
                state.isAuthenticated = true;
            })
            .addCase(login.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(register.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action) =>{
                state.status = 'succeeded';
                state.token = action.payload.token;
                state.user = action.payload.user ?? null;
                state.isAuthenticated = true;
            })
            .addCase(register.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export const { logout, clearAuthError } = authSlice.actions;
export default authSlice.reducer;