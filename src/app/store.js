import { configureStore } from "@reduxjs/toolkit";
import allRecordsReducer from '../features/allRecords'
import recordsToDisplayReducer from "../features/recordsToDisplay"
import startIndexReducer from '../features/startIndex';
import endIndexReducer from "../features/endIndex"
import individualRecordReducer from '../features/individualRecord';
import showModalReducer from '../features/showModal';
import showMsgReducer from '../features/showMsg';
import msgTextReducer from '../features/msgText';
import showNewRecordModalReducer from "../features/showNewRecordModal"
import loggedInReducer from "../features/loggedIn";

export const store = configureStore({
    reducer: {
        allRecords: allRecordsReducer,
        recordsToDisplay: recordsToDisplayReducer,
        startIndex: startIndexReducer,
        endIndex: endIndexReducer,
        individualRecord: individualRecordReducer,
        showModal: showModalReducer,
        showMsg: showMsgReducer,
        msgText: msgTextReducer,
        showNewRecordModal: showNewRecordModalReducer,
        loggedIn: loggedInReducer
    },
});
