import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { USER_PROFILE_URL } from "../url";

export const fetchUserProfile = createAsyncThunk(
    "fetchUserProfile",
    async (username) => {
        const res = await fetch(USER_PROFILE_URL.GET + username)
        const data = await res.json()
        return {
            "status": res.status,
            "profile": data
        }
    }
)


export const userProfileSlice = createSlice({
    name: "userProfile",
    initialState: { value: {} },
    reducers: {
        setUserProfile: (state, action) => {
            state.value = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserProfile.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    action.payload.profile.userPosts.posts.reverse()
                    action.payload.profile.userComments.commentList.reverse()
                    state.value = action.payload.profile
                }
            })
    }
})

export const { setUserProfile } = userProfileSlice.actions;
export default userProfileSlice.reducer
