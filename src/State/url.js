export const COIN_URL = {
    "LIST_NAME": "coinList",
    "GET_ALL": "/api/get-coins",
    "GET_ONE": "/api/coin/"
}

export const POSTS_URL = {
    "LIST_NAME": "posts",
    "GET_ALL": "/api/posts",
    "GET_ONE": "/api/posts/",
    "POST": "/api/posts",
    "PATCH": "/api/posts/",
    "DELETE": "/api/posts/",
}

export const WALLET_URL = {
    "LIST_NAME": "savedCoinsList",
    "GET_ALL_BY_USER": "/api/saved-coins/user/",
    "POST": "/api/saved-coins/add",
    "DELETE": "/api/saved-coins/delete/"
}

export const COMMENTS_URL = {
    "LIST_NAME": "commentList",
    "GET_ALL": "/api/comments",
    "GET_ALL_BY_POST_ID": "/api/comments/post/",
    "POST": "/api/comments/add",
    "PATCH": "/api/comments/edit/",
    "DELETE": "/api/comments/delete/",
    "DELETE_BY_POST_ID": "/api/comments/delete-all/post/"
}

export const USER_URL = {
    "LOGIN": "/api/getuser",
    "CREATE": "/api/createuser",
    "UPDATE": "/api/updateuser/",
    "ALL_USERS": "/api/users",
    "DELETE": "/api/deleteuser/",
}

export const USER_PROFILE_URL = {
    "GET": "/api/"
}