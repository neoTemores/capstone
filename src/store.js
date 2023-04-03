import { configureStore } from "@reduxjs/toolkit";
import loggedInReducer from "./State/user/loggedIn";
import allCoinsReducer from "./State/coins/allCoins"
import allPostsReducer from "./State/posts/allPosts"
import savedCoinsReducer from "./State/wallet/savedCoins"
import allCoinDataReducer from "./State/wallet/allCoinData"
import allCommentsReducer from "./State/comments/allComments";
import currentUserReducer from "./State/user/currentUser";
import showNewPostModalReducer from "./State/posts/showNewPostModal";
import userProfileReducer from "./State/user/userProfile";

export const store = configureStore({
    reducer: {
        loggedIn: loggedInReducer,
        allCoins: allCoinsReducer,
        allPosts: allPostsReducer,
        savedCoins: savedCoinsReducer,
        allCoinData: allCoinDataReducer,
        allComments: allCommentsReducer,
        currentUser: currentUserReducer,
        showNewPostModal: showNewPostModalReducer,
        userProfile: userProfileReducer,
    },
});
