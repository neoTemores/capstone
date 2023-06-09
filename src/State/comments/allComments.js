import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { COMMENTS_URL } from "../url";

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

export const patchComment = createAsyncThunk(
    "patchComment",
    async (comment) => {
        let patchReq = {
            method: "PATCH",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(comment)
        }

        const res = await fetch(COMMENTS_URL.PATCH + comment.id, patchReq)
        const data = await res.json()

        return {
            "status": res.status,
            "comment": data
        }
    }
)

export const deleteComment = createAsyncThunk(
    "deleteComment",
    async (commentId) => {
        let deleteReq = {
            method: "DELETE"
        }

        const res = await fetch(COMMENTS_URL.DELETE + commentId, deleteReq)
        return {
            "status": res.status,
            "id": commentId
        }
    }
)

export const deleteAllCommentsByPostId = createAsyncThunk(
    "deleteAllCommentsByPostId",
    async (postId) => {
        let deleteReq = {
            method: "DELETE"
        }
        const res = await fetch(COMMENTS_URL.DELETE_BY_POST_ID + postId, deleteReq)
        return {
            "status": res.status,
            "postId": postId
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
            .addCase(deleteComment.fulfilled, (state, action) => {
                if (action.payload.status === 202)
                    state.value = state.value.filter(elem => elem.id !== +action.payload.id)
            })
            .addCase(patchComment.fulfilled, (state, action) => {
                if (action.payload.status === 200)
                    state.value.forEach(elem => {
                        if (elem.id === +action.payload.comment.id)
                            return elem.body = action.payload.comment.body
                    })
            })
            .addCase(deleteAllCommentsByPostId.fulfilled, (state, action) => {
                if (action.payload.status === 202)
                    state.value = state.value.filter(elem => elem.postId !== +action.payload.postId)
            })
    }
})

export const { setAllComments } = allCommentsSlice.actions;
export default allCommentsSlice.reducer;