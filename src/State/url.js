export const COIN_URL = {
    "LIST_NAME": "coinList",
    "GET_ALL": "http://localhost:8080/api/get-coins",
    "GET_ONE": "http://localhost:8080/api/coin/"
}

export const POSTS_URL = {
    "LIST_NAME": "posts",
    "GET_ALL": "http://localhost:8080/api/posts",
    "GET_ONE": "http://localhost:8080/api/posts/",
    "POST": "http://localhost:8080/api/posts",
    "PATCH": "http://localhost:8080/api/posts/",
    "DELETE": "http://localhost:8080/api/posts/",
}

export const WALLET_URL = {
    "LIST_NAME": "savedCoinsList",
    "GET_ALL_BY_USER": "http://localhost:8080/api/saved-coins/user/",
    "POST": "http://localhost:8080/api/saved-coins/add",
    "DELETE": "http://localhost:8080/api/saved-coins/delete/"
}

export const COMMENTS_URL = {
    "LIST_NAME": "commentList",
    "GET_ALL": "http://localhost:8080/api/comments",
    "GET_ALL_BY_POST_ID": "http://localhost:8080/api/comments/post/",
    "POST": "http://localhost:8080/api/comments/add",
    "PATCH": "http://localhost:8080/api/comments/edit/",
    "DELETE": "http://localhost:8080/api/comments/delete/",
    "DELETE_BY_POST_ID": "http://localhost:8080/api/comments/delete-all/post/"
}

export const USER_URL = {
    "LOGIN": "http://localhost:8080/api/getuser",
    "CREATE": "http://localhost:8080/api/createuser"
}

export const USER_PROFILE_URL = {
    "GET": "http://localhost:8080/api/"
}