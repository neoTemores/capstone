import { configureStore } from "@reduxjs/toolkit";
import loggedInReducer from "./State/user/loggedIn";


export const store = configureStore({
    reducer: {
        loggedIn: loggedInReducer,
    },
});
