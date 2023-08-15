import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiPublicRequest } from "../apiRequest";

const initialState = {
    currentVideo: null,
    error: null
}
export const fetchVideo = createAsyncThunk('video/fetch', async (videoId) => {
    console.log("running")
    try {
        const response = await apiPublicRequest.get(`/video/${videoId}`);
        return response.data.video
    } catch (error) {
        return Promise.reject(error.response.data.msg)
    }
})

const videoSlice = createSlice({
    name: 'video',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchVideo.pending]: (state) => {
            state.currentVideo = null
        },
        [fetchVideo.fulfilled]: (state, {payload}) => {
            state.currentVideo = payload
        },
        [fetchVideo.rejected]: (state, action) => {
            state.currentVideo = null
            state.error = action.error.message
        }
    }
})

export const selectCurrentVideo = state => state.video.currentVideo
// export const selectError = state => state.video.error

export default videoSlice.reducer