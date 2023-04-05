import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { COIN_URL } from "../url";


export const fetchProfileCoinDetails = createAsyncThunk(
    "fetchProfileCoinDetails",
    async (coinId) => {
        const res = await fetch(COIN_URL.GET_ONE + coinId)
        const data = await res.json()
        return data.coin
    }
)


export const profileCoinDetailsSlice = createSlice({
    name: "profileCoinDetails",
    initialState: { value: [] },
    reducers: {
        setProfileCoinDetails: (state, action) => {
            state.value = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            // .addCase(fetchIndividualCoinData.pending, (state) => {
            //     state.value = []
            // })
            .addCase(fetchProfileCoinDetails.fulfilled, (state, action) => {
                state.value = [...state.value, action.payload]
            })
    }
})

export const { setProfileCoinDetails } = profileCoinDetailsSlice.actions;
export default profileCoinDetailsSlice.reducer;