import { configureStore } from "@reduxjs/toolkit";
import loggedInReducer from "./State/user/loggedIn";
import allCoinsReducer from "./State/coins/allCoins"
import allPostsReducer from "./State/posts/allPosts"
import savedCoinsReducer from "./State/wallet/savedCoins"
import allCoinDataReducer from "./State/wallet/allCoinData"


export const store = configureStore({
    reducer: {
        loggedIn: loggedInReducer,
        allCoins: allCoinsReducer,
        allPosts: allPostsReducer,
        savedCoins: savedCoinsReducer,
        allCoinData: allCoinDataReducer,
    },
});
