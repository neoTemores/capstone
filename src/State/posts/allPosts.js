import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { POSTS_URL } from "../../App";

export const fetchAllPosts = createAsyncThunk(
    "fetchAllPosts",
    async () => {
        const res = await fetch(POSTS_URL.GET_ALL)
        const data = await res.json()
        return data[POSTS_URL.LIST_NAME].reverse()
    }
)

export const addNewPost = createAsyncThunk(
    "addNewPost",
    async (newPost) => {
        let postReq = {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newPost)
        }

        const res = await fetch(POSTS_URL.POST, postReq)
        const data = await res.json()

        return {
            "status": res.status,
            "newPost": data
        }
    }
)

export const patchPost = createAsyncThunk(
    "patchPost",
    async (updatedPost) => {
        let patchReq = {
            method: "PATCH",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedPost)
        }
        const res = await fetch(POSTS_URL.PATCH + updatedPost.id, patchReq)
        const data = await res.json()
        return {
            "status": res.status,
            "updatedPost": data
        }

    }
)

export const deletePost = createAsyncThunk(
    "deletePost",
    async (postId) => {
        let deleteReq = {
            method: "DELETE"
        }
        const res = await fetch(POSTS_URL.DELETE + postId, deleteReq)
        return {
            "status": res.status,
            "postId": postId
        }
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
            .addCase(addNewPost.fulfilled, (state, action) => {
                if (action.payload.status === 200)
                    state.value = [action.payload.newPost, ...state.value]
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                if (action.payload.status === 202)
                    state.value = state.value.filter(elem => elem.id !== +action.payload.postId)
            })
            .addCase(patchPost.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    state.value.forEach(elem => {
                        if (elem.id === +action.payload.updatedPost.id) {
                            elem.title = action.payload.updatedPost.title
                            elem.body = action.payload.updatedPost.body
                            return
                        }
                    })
                }

            })
    }
})

export const { setAllPosts } = allPostsSlice.actions;
export default allPostsSlice.reducer;