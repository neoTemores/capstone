import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { URL } from "../App";


export const fetchIndividualRecord = createAsyncThunk(
    "fetchIndividualRecord",
    async (id) => {
        const res = await fetch(URL.FETCH_ONE + id);
        const data = await res.json();
        console.log(data)
        return data;
    }
)

export const individualRecordSlice = createSlice({
    name: "individualRecord",
    initialState: { value: [], status: "idle" },
    reducers: {
        setIndividualRecord: (state, action) => {
            state.value = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchIndividualRecord.pending, (state) => { state.status = 'loading' })
            .addCase(fetchIndividualRecord.fulfilled, (state, action) => {
                state.status = 'idle';
                state.value = [action.payload];
            })
    }
})

export const selectIndividualRecord = (state) => state.individualRecord.value;
export const { setIndividualRecord } = individualRecordSlice.actions;
export default individualRecordSlice.reducer;