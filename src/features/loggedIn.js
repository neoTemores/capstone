import { createSlice } from "@reduxjs/toolkit";

export const loggedInSlice = createSlice({
    name: "loggedIn",
    initialState: { value: true },
    reducers: {
        setLoggedIn: (state, action) => {
            state.value = action.payload;
        }
    }
})

export const { setLoggedIn } = loggedInSlice.actions;
export default loggedInSlice.reducer;