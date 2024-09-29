import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

const API_URL = `http://yume:3004/api/user`

export const signup = createAsyncThunk(
    'auth/signup',
    async ({ username, email, password, dob }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_URL}/signup`, {
                username,
                email,
                password,
                dob
            });
            console.log(response.data)
            return response.data
        }
        catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const verifyEmail = createAsyncThunk(
    'auth/verifyEmail',
    async (token, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_URL}/verify-email`, {
                params: { token }
            })
            console.log(response.data)
            return response.data
        }
        catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        token: localStorage.getItem('jwtToken'),
        loading: false,
        error: null,
        isAuthenticated: !!localStorage.getItem('jwtToken'),
        signupSuccess: false,
        emailSent: false,
    },
    reducers: {
        logout: (state) => {    
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
        },
        clearError: (state) => {
            state.error = null;
        },
        setCredentials: (state, action) => {
            const { user, token } = action.payload;
            state.user = user;
            state.token = token;
            state.isAuthenticated = true;
            localStorage.setItem('jwtToken', token); 
          },
          clearSignupSuccess: (state) => {
            state.signupSuccess = false;
            state.emailSent = false;
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(signup.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        
        .addCase(signup.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload?.message || 'Signup failed';
        })
        .addCase(verifyEmail.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(verifyEmail.fulfilled, (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.token = action.payload.token;
            state.user = action.payload.user;
            state.error = null;
            localStorage.setItem('jwtToken', action.payload.token);
        })
        .addCase(verifyEmail.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload?.message || 'Email verification failed';
        })
        .addCase(signup.fulfilled, (state, action) => {
            state.loading = false;
            state.signupSuccess = true;
            state.emailSent = true; // Set this to true when signup is successful
            state.error = null;
        })
    },
})

export const { logout, clearError  , setCredentials ,clearSignupSuccess} = authSlice.actions;
export default authSlice.reducer;