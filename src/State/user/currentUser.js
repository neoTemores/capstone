import { createSlice } from "@reduxjs/toolkit";

export const currentUserSlice = createSlice({
    name: "currentUser",
    initialState: { value: { id: 1, username: "user1", password: "user1", bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur dignissim nunc sodales ante iaculis, convallis ullamcorper elit luctus. Pellentesque eu sodales lorem, nec gravida magna. In hac habitasse platea dictumst. Praesent eu mauris varius, tristique odio non, convallis mauris. Vivamus pretium vehicula risus iaculis sodales. Phasellus eleifend sapien erat, eget fermentum sapien iaculis id. Praesent libero sem, suscipit malesuada dui aliquet, mattis pulvinar eros. Phasellus ut risus volutpat, efficitur justo sagittis, porta lectus. Sed venenatis feugiat erat, eget molestie dolor suscipit vitae. Mauris eget nulla consequat, rhoncus ligula a, sodales turpis. Proin eget finibus nisi. Aenean sit amet vestibulum mauris. Nullam ornare faucibus lorem, in ullamcorper odio ullamcorper eu." } },
    reducers: {
        setCurrentUser: (state, action) => {
            state.value = action.payload
        }
    }
})

export const { setCurrentUser } = currentUserSlice.actions;
export default currentUserSlice.reducer;