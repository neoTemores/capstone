import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { POSTS_URL } from "../../App";

export const fetchAllPosts = createAsyncThunk(
    "fetchAllPosts",
    async () => {
        const res = await fetch(POSTS_URL.GET_ALL)
        const data = await res.json()
        console.log(data)
        return data[POSTS_URL.LIST_NAME]
    }
)

export const allPostsSlice = createSlice({
    name: "allPosts",
    initialState: { value: [] },
    reducers: {
        setAllPosts: (state, action) => {
            state.value = action.payload
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllPosts.fulfilled, (state, action) => {
                state.value = action.payload;
            })
    }
})

export const { setAllPosts } = allPostsSlice.actions;
export default allPostsSlice.reducer;