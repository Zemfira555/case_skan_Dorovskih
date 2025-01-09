import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {GetPosts, Post} from "../../types/types.ts";
import {postAPI} from "../../api/routes/postAPI.ts";

const postSlice = createSlice({
    name: "posts", initialState: {
        posts: [] as Post[], error: null, histograms: [] as { value: string; date: Date }[], pending: false
    }, reducers: {
        setError(state, action) {
            state.error = action.payload;
        }
    }, extraReducers: builder => {
        builder.addCase(getPosts.fulfilled, (state, action) => {
            state.pending = false;
            state.posts = action.payload;
        });
        builder.addCase(getPosts.pending, (state) => {
            state.pending = true
        });
        builder.addCase(fetchHistograms.fulfilled, (state, action) => {
            state.pending = false;
            state.histograms = action.payload as { value: string; date: Date }[];
        })
        builder.addCase(fetchHistograms.pending, (state) => {
            state.pending = true;
        })
    }
});

export const {setError} = postSlice.actions;

export const getPosts = createAsyncThunk('/posts/get', async (payload: GetPosts, {dispatch}) => {
    const data = await postAPI.getPosts(payload);
    if (data.success !== false) {
        return data;
    }
    dispatch(setError(data.message));
});

export const fetchHistograms = createAsyncThunk('/posts/histograms/get', async (payload: GetPosts, {dispatch}) => {
    const data = await postAPI.getHistograms(payload);
    if (data.success !== false) {
        return [...data[0], ...data[1]];
    }

    dispatch(setError(data.message));
})

export default postSlice.reducer;