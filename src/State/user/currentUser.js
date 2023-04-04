import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { USER_URL } from "../url";

export const attemptUserLogin = createAsyncThunk(
    "attemptUserLogin",
    async (user) => {
        let reqBody = {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        }

        const res = await fetch(USER_URL.LOGIN, reqBody)
        const data = await res.json()
        return {
            "status": res.status,
            "user": data
        }
    }
)


export const currentUserSlice = createSlice({
    name: "currentUser",
    initialState: { value: {} },
    reducers: {
        setCurrentUser: (state, action) => {
            state.value = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(attemptUserLogin.fulfilled, (state, action) => {
                if (action.payload.status === 200)
                    state.value = action.payload.user
            })
    }
})

export const { setCurrentUser } = currentUserSlice.actions;
export default currentUserSlice.reducer;