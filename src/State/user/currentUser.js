import { createSlice } from "@reduxjs/toolkit";

export const currentUserSlice = createSlice({
    name: "currentUser",
    initialState: { value: { id: 1, username: "user1", password: "user1", bio: "" } },
    reducers: {
        setCurrentUser: (state, action) => {
            state.value = action.payload
        }
    }
})

export const { setCurrentUser } = currentUserSlice.actions;
export default currentUserSlice.reducer;