import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiPublicRequest } from "../apiRequest";

const initialState = {
    currentUser: null,
    token: null,
    error: null
}

export const userLogin = createAsyncThunk('auth/login', async (user) => {
    try {
        const response = await apiPublicRequest.post('/user/login', user);
        return response.data
    } catch (error) {
        return Promise.reject(error.response.data.msg)
    }
})

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: () => {
            return initialState
        }
    },
    extraReducers: {
        [userLogin.pending]: (state) => {
            state.currentUser = null
            state.token = null
        },
        [userLogin.fulfilled]: (state, {payload}) => {
            state.currentUser = payload
            state.token = payload.accessToken
        },
        [userLogin.rejected]: (state, action) => {
            state.currentUser = null
            state.error = action.error.message
        },
    
    }
})

export const selectCurrentUser = state => state.auth.currentUser
export const selectError = state => state.auth.error
export const selectToken = state => state.auth.token

export const {logout} = authSlice.actions
export default authSlice.reducer