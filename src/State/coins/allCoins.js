import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { COIN_URL } from "../../App";

export const fetchAllCoins = createAsyncThunk(
    "fetchAllCoins",
    async () => {
        const res = await fetch(COIN_URL.GET_ALL);
        const data = await res.json();
        return data[COIN_URL.LIST_NAME]
    }
)

export const allCoinsSlice = createSlice({
    name: "allCoins",
    initialState: { value: [] },
    reducers: {
        setAllCoins: (state, action) => {
            state.value = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllCoins.fulfilled, (state, action) => {
                state.value = action.payload;
            }
            )
    }
})

export const { setAllCoins } = allCoinsSlice.actions;
export default allCoinsSlice.reducer;