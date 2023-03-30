import { configureStore } from "@reduxjs/toolkit";
import loggedInReducer from "./State/user/loggedIn";
import allCoinsReducer from "./State/coins/callCoins"


export const store = configureStore({
    reducer: {
        loggedIn: loggedInReducer,
        allCoins: allCoinsReducer,
    },
});
