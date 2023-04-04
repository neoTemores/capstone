import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { USER_URL } from "../url";

export const fetchAllUsersList = createAsyncThunk(
    "fetchAllUsersList",
    async () => {
        const res = await fetch(USER_URL.ALL_USERS)
        const data = await res.json()
        return {
            "status": res.status,
            "userList": data.users
        }
    }
)

export const allUsersListSlice = createSlice({
    name: "allUsersList",
    initialState: { value: [] },
    reducers: {
        setAllUsersList: (state, action) => {
            state.value = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllUsersList.fulfilled, (state, action) => {
                if (action.payload.status === 200)
                    state.value = action.payload.userList
            })
    }
})

export const { setAllUsersList } = allUsersListSlice.actions;
export default allUsersListSlice.reducer