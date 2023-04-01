import { createSlice } from "@reduxjs/toolkit";

export const showNewPostModalSlice = createSlice({
    name: "showNewPostModalSlice",
    initialState: { value: false },
    reducers: {
        setShowNewPostModal: (state, action) => {
            state.value = action.payload
        }
    }
})

export const { setShowNewPostModal } = showNewPostModalSlice.actions;
export default showNewPostModalSlice.reducer