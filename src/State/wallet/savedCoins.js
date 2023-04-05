import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { WALLET_URL } from "../url";

export const fetchAllSavedCoinsByUser = createAsyncThunk(
    "fetchAllSavedCoinsByUser",
    async (userid) => {
        const res = await fetch(WALLET_URL.GET_ALL_BY_USER + userid)
        const data = await res.json()
        return data[WALLET_URL.LIST_NAME]
    }
)

export const addCoinToWallet = createAsyncThunk(
    "addCoinToWallet",
    async (coin) => {
        let postReq = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(coin)
        }

        const res = await fetch(WALLET_URL.POST, postReq)
        const data = await res.json()
        console.log(data)
        return {
            "status": res.status,
            "coin": data
        }
    }
)

export const deleteFromWallet = createAsyncThunk(
    "deleteFromWallet",
    async (id) => {
        let deleteReq = {
            method: "DELETE"
        }

        const res = await fetch(WALLET_URL.DELETE + id, deleteReq)
        return {
            "status": res.status,
            "id": id,
        }
    }
)

export const savedCoinsSlice = createSlice({
    name: "savedCoins",
    initialState: { value: [] },
    reducers: {
        setSavedCoins: (state, action) => {
            state.value = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            // .addCase(fetchAllSavedCoinsByUser.pending, (state) => {
            //     state.value = []
            // })
            .addCase(fetchAllSavedCoinsByUser.fulfilled, (state, action) => {
                state.value = action.payload
            })
            .addCase(addCoinToWallet.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    state.value = [action.payload.coin, ...state.value]
                }
            })
            .addCase(deleteFromWallet.fulfilled, (state, action) => {
                if (action.payload.status === 202)
                    state.value = state.value.filter(elem => elem.id != action.payload.id)
            })
    }
})

export const { setSavedCoins } = savedCoinsSlice.actions;
export default savedCoinsSlice.reducer