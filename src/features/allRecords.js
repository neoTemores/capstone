import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { URL } from "../App";

export const fetchAllRecords = createAsyncThunk(
    'fetchAllRecords',
    async () => {
        const res = await fetch(URL.FETCH_ALL)
        const data = await res.json();
        console.log(data)
        return data[URL.LIST_NAME];
    }
);

export const addNewRecord = createAsyncThunk(
    'addNewRecord',
    async (newRecord) => {
        let postReq = {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newRecord)
        }
        const res = await fetch(URL.POST, postReq)
        const data = await res.json();
        return {
            "status": res.status,
            "newRecord": data,
        }
    }
)

export const deleteOneRecord = createAsyncThunk(
    'deleteOneRecord',
    async (id) => {
        let deleteReq = {
            method: "DELETE"
        }
        const res = await fetch(URL.DELETE + id, deleteReq)
        return {
            "status": res.status,
            "id": id
        }
    }
)

export const patchOneRecord = createAsyncThunk(
    'patchOneRecord',
    async (patch) => {
        let patchReq = {
            method: "PATCH",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(patch)
        }
        const res = await fetch(URL.PATCH + patch.id, patchReq)
        return {
            "status": res.status,
            "patch": patch
        }
    }
)

export const allRecordsSlice = createSlice({
    name: "allRecords",
    initialState: { value: [], status: 'idle' },
    reducers: {
        setAllRecords: (state, action) => { state.value = action.payload },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllRecords.fulfilled, (state, action) => {
                state.value = action.payload;
            })
            .addCase(deleteOneRecord.fulfilled, (state, action) => {
                if (action.payload.status === 200)
                    state.value = state.value.filter(elem => elem.id !== action.payload.id)
            })
            .addCase(patchOneRecord.fulfilled, (state, action) => {
                if (action.payload.status === 200)
                    state.value.forEach(elem => {
                        if (elem.id === +action.payload.patch.id) {
                            elem.title = action.payload.patch.title
                            elem.body = action.payload.patch.body
                            return;
                        }
                    })
            })
            .addCase(addNewRecord.fulfilled, (state, action) => {
                state.value = [action.payload.newRecord, ...state.value]
            })
    }

})

export const { setAllRecords, editAllRecords } = allRecordsSlice.actions;

export default allRecordsSlice.reducer;
