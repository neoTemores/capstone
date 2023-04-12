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
        sortCoinDataBy: ((state, action) => {
            if (state.value.length === 1) return;

            if (action.payload.reverse) {
                state.value = state.value.sort((a, b) =>
                    (a[action.payload.col] < b[action.payload.col]) ? 1 : -1)
            }

            else {
                state.value = state.value.sort((a, b) =>
                    (a[action.payload.col] > b[action.payload.col]) ? 1 : -1)
            }
        })
    },
    extraReducers: (builder) => {
        builder
            // .addCase(fetchIndividualCoinData.pending, (state) => {
            //     state.value = []
            // })
            .addCase(fetchIndividualCoinData.fulfilled, (state, action) => {
                state.value = [...state.value, action.payload]
            })
    }
})

export const { setAllCoinData, sortCoinDataBy } = allCoinDataSlice.actions;
export default allCoinDataSlice.reducer;