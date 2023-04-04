import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { COIN_URL } from "../url";


export const fetchIndividualCoinData = createAsyncThunk(
    "fetchIndividualCoinData",
    async (coinId) => {
        const res = await fetch(COIN_URL.GET_ONE + coinId)
        const data = await res.json()
        return data.coin
    }
)


export const allCoinDataSlice = createSlice({
    name: "allCoinData",
    initialState: { value: [] },
    reducers: {
        setAllCoinData: (state, action) => {
            state.value = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchIndividualCoinData.fulfilled, (state, action) => {
                state.value = [...state.value, action.payload]
            })
    }
})

export const { setAllCoinData } = allCoinDataSlice.actions;
export default allCoinDataSlice.reducer;