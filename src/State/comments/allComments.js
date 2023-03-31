import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { COMMENTS_URL } from "../../App";

export const fetchAllComments = createAsyncThunk(
    "fetchAllComments",
    async (postId) => {
        const res = await fetch(COMMENTS_URL.GET_ALL)
        const data = await res.json()
        return data[COMMENTS_URL.LIST_NAME].reverse()
    }
)

export const allCommentsSlice = createSlice({
    name: "allCommentsSlice",
    initialState: { value: [] },
    reducers: {
        setAllComments: (state, action) => {
            state.value = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllComments.fulfilled, (state, action) => {
                state.value = action.payload
            })
    }
})

export const { setAllComments } = allCommentsSlice.actions;
export default allCommentsSlice.reducer;