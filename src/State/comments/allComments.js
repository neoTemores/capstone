import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { COMMENTS_URL } from "../../App";

export const fetchAllComments = createAsyncThunk(
    "fetchAllComments",
    async () => {
        const res = await fetch(COMMENTS_URL.GET_ALL)
        const data = await res.json()
        return data[COMMENTS_URL.LIST_NAME].reverse()
    }
)

export const postNewComment = createAsyncThunk(
    "postNewComment",
    async (comment) => {
        let postReq = {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(comment)
        }

        const res = await fetch(COMMENTS_URL.POST, postReq)
        const data = await res.json()

        return {
            "status": res.status,
            "newComment": data
        }
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
            .addCase(postNewComment.fulfilled, (state, action) => {
                if (action.payload.status === 200)
                    state.value = [action.payload.newComment, ...state.value]
            })
    }
})

export const { setAllComments } = allCommentsSlice.actions;
export default allCommentsSlice.reducer;